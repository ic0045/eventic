const ger = require('ger')
import {Avaliacao} from "@app/server/entities/avaliacao.entity"
import { Evento } from '@app/server/entities/evento.entity';
import Cosine from "string-comparison"

/*
* Classe geradora de recomendações para um evento
*/
export class RecommendationService{

    private baseEvent : Evento  //Evento base
    private userId : String | undefined;             //Id do usuário
    private userRatedEvents : string[];             //Eventos avaliados pelo usuário
    private generalRatings : Avaliacao[];     //Avaliações de outros eventos
    private recommender : any;                      //Recomendador
    private gerEvents : any;                      //Eventos do recomendador
    private minimumSimilarity : number;         //Valor mínimo de similaridade

    //Palavras para desconsiderar na similiaridade de texto
    static dropWords = ["a", "agora", "ainda", "alguém", "algum", "alguma", "algumas", "alguns", "ampla", "amplas", "amplo", "amplos", "ante", "antes", "ao", "aos", "após", "aquela", "aquelas", "aquele", "aqueles", "aquilo", "as", "até", "através", "cada", "coisa", "coisas", "com", "como", "contra", "contudo", "da", "daquele", "daqueles", "das", "de", "dela", "delas", "dele", "deles", "depois", "dessa", "dessas", "desse", "desses", "desta", "destas", "deste", "deste", "destes", "deve", "devem", "devendo", "dever", "deverá", "deverão", "deveria", "deveriam", "devia", "deviam", "disse", "disso", "disto", "dito", "diz", "dizem", "do", "dos", "e", "é", "ela", "elas", "ele", "eles", "em", "enquanto", "entre", "era", "essa", "essas", "esse", "esses", "esta", "está", "estamos", "estão", "estas", "estava", "estavam", "estávamos", "este", "estes", "estou", "eu", "fazendo", "fazer", "feita", "feitas", "feito", "feitos", "foi", "for", "foram", "fosse", "fossem", "grande", "grandes", "há", "isso", "isto", "já", "lá", "lhe", "lhes", "lo", "mas", "me", "mesma", "mesmas", "mesmo", "mesmos", "meu", "meus", "minha", "minhas", "muita", "muitas", "muito", "muitos", "na", "não", "nas", "nem", "nenhum", "nessa", "nessas", "nesta", "nestas", "ninguém", "no", "nos", "nós", "nossa", "nossas", "nosso", "nossos", "num", "numa", "nunca", "o", "os", "ou", "outra", "outras", "outro", "outros", "para", "pela", "pelas", "pelo", "pelos", "pequena", "pequenas", "pequeno", "pequenos", "per", "perante", "pode", "pude", "podendo", "poder", "poderia", "poderiam", "podia", "podiam", "pois", "por", "porém", "porque", "posso", "pouca", "poucas", "pouco", "poucos", "primeiro", "primeiros", "própria", "próprias", "próprio", "próprios", "quais", "qual", "quando", "quanto", "quantos", "que", "quem", "são", "se", "seja", "sejam", "sem", "sempre", "sendo", "será", "serão", "seu", "seus", "si", "sido", "só", "sob", "sobre", "sua", "suas", "talvez", "também", "tampouco", "te", "tem", "tendo", "tenha", "ter", "teu", "teus", "ti", "tido", "tinha", "tinham", "toda", "todas", "todavia", "todo", "todos", "tu", "tua", "tuas", "tudo", "última", "últimas", "último", "últimos", "um", "uma", "umas", "uns", "vendo", "ver", "vez", "vindo", "vir", "vos", "vós",
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves','he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',  'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was',  'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and',  'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off',  'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both',  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too','very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];

    public constructor(baseEvent: Evento, userId: String | undefined,
        userRatedEvents: string[] | null, generalRatings: Avaliacao[], minumumSimilarity: number) {
        this.baseEvent = baseEvent;
        this.userId = userId;
        this.userRatedEvents = userRatedEvents ?? [];
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

        for(let rating of this.generalRatings){
            if(rating.nota >= 4){
                //@ts-ignore
                if(this.userId && (this.getCosineSimilarity(rating.evento) < this.minimumSimilarity)){
                    //console.log("           (X) Evento não adicionado")}
                    continue;
                }

                /*
                * Adiciona evento na base do GER apenas se usuário não logado ou estiver logado e
                * os eventos possuem similaridade cosseno de pelo menos o definido em parâmetro
                */
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
        
        //Gera recomendações com o GER
        this.recommender.events(this.gerEvents);
        let recIds = []
        let recommendations = (await this.recommender.recommendations_for_thing(
            'events',this.baseEvent.id, {actions: {likes: 1}})).recommendations;
        if(recommendations.length > 0){ 
            for(let rec of recommendations){
                //Não recomendar eventos já avaliados pelo usuário
                //@ts-ignore
                if(!this.userRatedEvents.includes(rec.thing))
                    recIds.push(rec.thing)
            }
        }
        return recIds; //Retorna os ids dos eventos recomendados
    }

    /*
    * Retorna array com ids dos eventos a serem recomendados a partir de um array de eventos.
    * Cacula apenas similaridade do cosseno entre os eventos. 
    * Usado quando o usuário estiver logado e evento não possuir avaliações
    */
    public async generateRecsWithoutRatings(eventsArray : Evento[]) :  Promise<string[]> {
        let eventsSimilarity : {id: string, similarity: number}[] = [];

        // console.log("\n-----------Comparando---------------");
        // console.log(this.getCleanText(this.baseEvent.titulo) + " " + this.getCleanText(this.baseEvent.descricao));
        // console.log("-------------------\n");

        eventsArray.forEach(event => {
            let similarity = this.getCosineSimilarity(event);
            // console.log(this.getCleanText(event.titulo) + " " + this.getCleanText(event.descricao) + " :::>> " + similarity)
            if(similarity >= this.minimumSimilarity)
                eventsSimilarity.push({
                    id: event.id,
                    similarity:  similarity
                })
        });
        eventsSimilarity.sort((ev1, ev2) => ev1.similarity - ev2.similarity);
        return eventsSimilarity.map(ev => ev.id);
    }

    /*
    * Retorna a porcentagem de similaridade do cosseno entre dois títulos de eventos
    */
    private getCosineSimilarity (event : Evento) : number{
        const words1 = this.getCleanText(this.baseEvent.titulo) + " " + this.getCleanText(this.baseEvent.descricao);
        const words2 = this.getCleanText(event.titulo) + " " + this.getCleanText(event.descricao);
        
        let simValue = Cosine.cosine.similarity(words1,words2);
        return simValue;
    }

    /*
    * Retorna o título eliminando as palavras a serem desconsideradas
    */
    private getCleanText(title : string) : string{
        title = title.toLowerCase();
        let words = title.split(" ");
        words = words.filter((word) => !RecommendationService.dropWords.includes(word));
        return words.reduce((word,acc) => word + " " + acc,"");
    }

}