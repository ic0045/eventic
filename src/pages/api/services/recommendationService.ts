const ger = require('ger')
import {Avaliacao} from "@app/server/entities/avaliacao.entity"
import Cosine from "string-comparison"

/*
* Classe geradora de recomendações para um evento
*/
export class RecommendationService{

    
    private eventId : string;                         //Id Evento base
    private eventTitle : string;                         //Nome Evento base
    private userId : String | undefined;             //Id do usuário
    private userRatedEvents : string[];             //Eventos avaliados pelo usuário
    private generalRatings : Avaliacao[];     //Avaliações de outros eventos
    private recommender : any;                      //Recomendador
    private gerEvents : any;                      //Eventos do recomendador
    private minimumSimilarity : number;         //Valor mínimo de similaridade

    //Palavras para desconsiderar na similiaridade de texto
    static dropWords = ["a","o", "as","os", "e", "da", "de", "do", 
    "das","dos","sobre","um","em"];

    public constructor(eventId : string, userId : String | undefined,
         userRatedEvents : string[] | null, generalRatings : Avaliacao[],
         eventTitle : string, minumumSimilarity : number){
            this.eventId = eventId;
            this.eventTitle = eventTitle;
            this.userId = userId;
            this.userRatedEvents = userRatedEvents??[];
            this.generalRatings = generalRatings;
            this.recommender = new ger.GER(new ger.MemESM());
            this.gerEvents = []; 
            this.minimumSimilarity = minumumSimilarity;
    }


    /*
    *   Retorna array com ids dos eventos a serem recomendados
    */
    public async generateRecs() : Promise<string[]>{
        await this.recommender.initialize_namespace('events');

        //Debug lines
        console.log("\n=====\n[DEBUG]")
        console.log(`\nEvento base = ${this.eventTitle}, similaridade_min = ${this.minimumSimilarity}`);
        console.log("User Rated Events = ",this.userRatedEvents);
        console.log("General ratings = ");
        for(let rating of this.generalRatings){
            //@ts-ignore
            console.log(`${rating.nota}, ${rating.usuario.primeiroNome} em --> ${rating.evento.titulo} (${rating.evento.id})`)
        }
        console.log("\n")

        for(let rating of this.generalRatings){
            if(rating.nota >= 3){
                if(this.userId){
                    //Gerar recomendações para usuário logado
                    //Recomendar eventos que tenham valor de simliaridade de pelo menos o definido em parâmetro
                    //@ts-ignore
                    console.log("[DEBUG] ==> Evento = "+rating.evento.titulo+ " -- Valor similaridade: "+this.getCosineSimilarity(this.eventTitle,rating.evento.titulo));
                    //@ts-ignore
                    if(this.getCosineSimilarity(this.eventTitle,rating.evento.titulo) >= this.minimumSimilarity){
                        //Não recomendar eventos já avaliados pelo usuário
                        //@ts-ignore
                        if(!this.userRatedEvents.includes(rating.evento.id)){
                            this.gerEvents.push({
                                namespace: 'events',
                                //@ts-ignore
                                person: rating.usuario.id,
                                action: 'likes',
                                //@ts-ignore
                                thing: rating.evento.id,
                                expires_at: Date.now()+3600000
                            });
                            console.log("           (V) Evento adicionado no GER")
                        }else{
                            console.log("           (X) Evento não recomendado pois já avaliado pelo usuário");
                        }
                    }else{console.log("           (X) Evento não recomendado por ter similaridade baixa")}
                }
                else{
                    //Gerar recomendações para usuário não logado
                    this.gerEvents.push({
                        namespace: 'events',
                        //@ts-ignore
                        person: rating.usuario.id,
                        action: 'likes',
                        //@ts-ignore
                        thing: rating.evento.id,
                        expires_at: Date.now()+3600000
                    });
                }
            }
        }
        //Gera recomendações com o GER
        this.recommender.events(this.gerEvents);
        let recIds = []
        let recommendations = (await this.recommender.recommendations_for_thing(
            'events',this.eventId, {actions: {likes: 1}})).recommendations;
        if(recommendations.length > 0){ //Obtém os ids dos eventos recomendados
            for(let rec of recommendations){
                recIds.push(rec.thing)
            }
        }
        return recIds;
    }

    /*
    * Retorna a porcentagem de similaridade do cosseno entre dois títulos de eventos
    */
    private getCosineSimilarity (t1 : string,t2 : string) : number{
        const words1 = this.getCleanTitle(t1);
        const words2 = this.getCleanTitle(t2);

        let simValue = Cosine.cosine.similarity(words1,words2);
        return simValue;
    }

    /*
    * Retorna o título eliminando as palavras a serem desconsideradas
    */
    private getCleanTitle(title : string) : string{
        let words = title.split(" ");
        words = words.filter((word) => !RecommendationService.dropWords.includes(word));
        return words.reduce((word,acc) => word + " " + acc,"");
    }

}