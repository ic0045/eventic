import { AvaliacaoRepo, EventoRepo } from '@app/server/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import {In} from 'typeorm'
const ger = require('ger')

/*
*   Rota para recomendações de eventos.
*   Query:  
*        evento_id para recomendar baseado no evento
*        usuario_id para recomendar baseado no evento utilizando perfil de usuário
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method === "GET"){
        let {evento_id, usuario_id} = req.query;
        if(usuario_id) usuario_id = usuario_id as string;
        const recommender = new ger.GER(new ger.MemESM());
        const gerEvents = [];
        let eventosAvaliados = null;
        // const topWords = {};

        //Gera recomendações de eventos similares a um evento
        if(evento_id){
            evento_id = evento_id as string;
            await recommender.initialize_namespace('eventos');
            const avaliacoesEvento = await AvaliacaoRepo.find(
                {where: {evento: {id: evento_id}},
                 relations: {usuario: true}
                });

            //Busca todas avaliacões de usuários que avaliaram este evento
            const usuariosIds = [];
            for(let avaliacao of avaliacoesEvento){
                //@ts-ignore
                usuariosIds.push(avaliacao.usuario.id);
            }
            const avaliacoesGeral = await AvaliacaoRepo.find(
                {
                    where: {usuario: {id: In(usuariosIds)}},
                    relations: {usuario: true, evento: true}
                }
            );

            //Conta palavras dos títulos de eventos que o usuário avaliou com nota 4 ou mais
            // if(usuario_id){
            //     const avaliacoesUsuario = await AvaliacaoRepo.find({
            //         where: {usuario: {id: usuario_id}},
            //         relations: {evento: true}
            //     });
            //     for(let avaliacao of avaliacoesUsuario){
            //         if(avaliacao.nota >= 4){
            //             //@ts-ignore
            //             countWords(avaliacao.evento.titulo, topWords);
            //         }
            //     }
            //  }

            //Considera que o usuário gostou do evento apenas se a nota for >= 3

            //To-do:
            //Considerar apenas eventos cuja a similaridade do cosseno 
            //entre o titulo do evento e os titulos dos eventos que o usuário gostou
            //seja maior que o parâmetro de similaridade minima 
            //definido no painel admnistrativo

            //Se passado Id do usuário, filtra para não adicionar os eventos já avaliados
            //pelo usuário na recomendação
            if(usuario_id){
                let avaliacoesUsuario = 
                await AvaliacaoRepo.find({
                    where: {usuario: {id: usuario_id}},
                    relations: {evento: true}
                });
                eventosAvaliados = [];
                for(let av of avaliacoesUsuario){
                    //@ts-ignore
                    eventosAvaliados.push(av.evento.id);
                }
            }

            for(let avaliacao of avaliacoesGeral){
                if(avaliacao.nota >= 3){
                    //@ts-ignore
                    if(!eventosAvaliados?.includes(avaliacao.evento.id))
                        gerEvents.push({
                            namespace: 'eventos',
                            //@ts-ignore
                            person: avaliacao.usuario.id,
                            action: 'likes',
                            //@ts-ignore
                            thing: avaliacao.evento.id,
                            expires_at: Date.now()+3600000
                        });
                }
            }
            recommender.events(gerEvents);
            let recommendations = (await recommender.recommendations_for_thing('eventos',evento_id, {actions: {likes: 1}})).recommendations;
            if(recommendations.length > 0){
                let recs = []
                for(let rec of recommendations){
                    recs.push(rec.thing)
                }
                recommendations = await EventoRepo.find({where: {id: In(recs)}});
            }
            res.status(200).json(recommendations);
        }
        //Gera recomendações de eventos para um dado usuario
        else if(usuario_id){
            usuario_id = usuario_id as string;
        }
        else{
            res.status(400).json({errorMsg: "Faltam parametros para gerar recomendações."})
        }
    }
}

// const countWords = (str : string, counter : {[key: string]:number}) : void => {
//     let words = str.trim().split(' ');
//     words.forEach((w)=>{
//         if(w.length > 0)
//         counter[w] = (counter[w] || 0) +1;
//     });
// }