import { AvaliacaoRepo, EventoRepo, ParametroRepo } from '@app/server/database';
import { RecommendationService } from "@app/pages/api/services/recommendationService"
import type { NextApiRequest, NextApiResponse } from 'next'
import {In} from 'typeorm'
import { Evento } from '@app/server/entities/evento.entity';
import { ParametroName } from '@app/common/constants';

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
        let eventosAvaliados = [], similaridadeMinima = 0;

        //Gera recomendações de eventos similares a um evento
        if(evento_id){
            evento_id = evento_id as string;
            let evento = await EventoRepo.findOne({where: {id:evento_id}}) as Evento;
            const avaliacoesEvento = await AvaliacaoRepo.find(
                {where: {evento: {id: evento_id}},
                 relations: {usuario: true}
                });

            //Para todo avaliador, busca as avaliações do avaliador em outros eventos
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

            //To-do:
            //Considerar apenas eventos cuja a similaridade do cosseno 
            //entre o titulo do evento e os titulos dos eventos que o usuário gostou (>=4)
            //seja maior que o parâmetro de similaridade minima 
            //definido no painel admnistrativo

            //Busca eventos avaliados pelo usuário se passado id de usuário
            if(usuario_id){
                let minimoParametro = await ParametroRepo.findOne(
                    {where: {nome: ParametroName.SIMILARIDADE_MIN}, select: {valor: true}
                })
                if(minimoParametro) similaridadeMinima = Number(minimoParametro.valor);
                let avaliacoesUsuario = 
                await AvaliacaoRepo.find({
                    where: {usuario: {id: usuario_id}},
                    relations: {evento: true}
                });
                for(let av of avaliacoesUsuario){
                    //@ts-ignore
                    eventosAvaliados.push(av.evento.id);
                }
            }
            const recService = new RecommendationService(evento_id,usuario_id,
                eventosAvaliados,avaliacoesGeral,evento.titulo,similaridadeMinima);
            let recIds = await recService.generateRecs();
            let recommendations: Evento[];
            if(recIds.length > 0)
                recommendations = await EventoRepo.find({where: {id: In(recIds)}});
            else recommendations = [];               
            res.status(200).json(recommendations);
            
        }
        else{
            res.status(400).json({errorMsg: "Faltam parametros para gerar recomendações."})
        }
    }
}