import { AvaliacaoRepo } from '@app/server/database';
import type { NextApiRequest, NextApiResponse } from 'next'
const ger = require('ger')

/*
*   Rota para recomendações de eventos.
*          
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method === "GET"){
        let {evento_id, usuario_id} = req.query;
        const recommender = new ger.GER(new ger.MemESM());
        const gerEvents = [];

        //Gera recomendações de eventos similares a um evento
        if(evento_id){
            evento_id = evento_id as string;
            const avaliacoes = await AvaliacaoRepo.find(
                {where: {evento: {id: evento_id}},
                 relations: {usuario: true}
                },);
            await recommender.initialize_namespace('eventos');
            for(let avaliacao of avaliacoes){
                if(avaliacao.nota >= 3)
                    gerEvents.push({
                        namespace: 'eventos',
                        //@ts-ignore
                        person: avaliacao.usuario.id,
                        action: 'likes',
                        thing: evento_id
                    });
            }
            recommender.events(gerEvents);
            res.status(200).json(await recommender.recommendations_for_thing('eventos',evento_id, {actions: {likes: 1}}));
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