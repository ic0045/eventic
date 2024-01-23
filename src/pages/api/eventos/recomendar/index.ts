import { AvaliacaoRepo, EventoRepo, ParametroRepo, CategoriaRepo } from '@app/server/database';
import { RecommendationService } from "@app/pages/api/services/recommendationService"
import type { NextApiRequest, NextApiResponse } from 'next'
import {In, Not} from 'typeorm'
import { Evento } from '@app/server/entities/evento.entity';
import { ParametroName } from '@app/common/constants';

/*
* Retorna eventos de categorias diversas cujo id não esteja incluso numa lista passada
*/
const findEventosDiversos = async (numeroEventos : number, skipEventosIds : string[] = []) : Promise<Evento[]> => {
   //seleciona eventos de categorias distintas
    let eventosDiversos = await EventoRepo
        .createQueryBuilder('evento')
        // .select(['DISTINCT evento.categoria_id', 'evento'])
        .distinctOn(['evento.categoria_id'])
        .where('evento.id NOT IN (:...ids)', { ids: skipEventosIds })
        .limit(numeroEventos)
        .getMany();

    let eventosSelecionados = eventosDiversos.length >= numeroEventos ? eventosDiversos.slice(0,numeroEventos) : eventosDiversos; 
   
    numeroEventos -= eventosSelecionados.length;

    //Completa com demais eventos de categorias diversas caso primeira busca não retorne o suficiente
    if(numeroEventos > 0){
        eventosDiversos = await EventoRepo
        .createQueryBuilder('evento')
        // .select(['DISTINCT evento.categoria_id', 'evento'])
        .distinctOn(['evento.categoria_id'])
        .where('evento.id NOT IN (:...ids)', { ids: skipEventosIds })
        .offset(eventosSelecionados.length)
        .limit(eventosSelecionados.length)
        .getMany();
        eventosSelecionados = eventosDiversos.length <= numeroEventos?
            eventosSelecionados.concat(eventosDiversos)
            :
            eventosSelecionados.concat(eventosDiversos.slice(numeroEventos-1));
    }
    return eventosSelecionados;
}

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
                //similaridadeMinima = 0 se não logado
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
            let recommendations: Evento[] = [];
            if(recIds.length != 0)
                recommendations = await EventoRepo.find({where: {id: In(recIds)}});

            // console.log("Recomendados buscados")
            // let stringFin = "";
            // for(let ev of recommendations)
            //     stringFin += ev.titulo + " || ";
            // console.log(stringFin)

            //Se houver menos que 5 eventos recomendados, completa com categorias diversas
            if(recIds.length < 5){
                console.log("[DEBUG] ==> Não foram recomendados eventos suficentes. Preechendo com eventos de categorias diversas");                

                //Desconsiderar evento atual, já avaliados e já na lista de recomendações
                let skipIds = eventosAvaliados.concat(recIds);
                skipIds.push(evento_id);
                
                // console.log("Skipids = ")
                // console.log(skipIds)
                // console.log("Resultado da chamada");
                // console.log(await (await findEventosDiversos(5-recommendations.length,skipIds)).forEach(ev => console.log(ev.titulo)))

                recommendations = recommendations.concat(await findEventosDiversos(5-recommendations.length,skipIds));                
            }

            res.status(200).json(recommendations);
        }
        else{
            res.status(400).json({errorMsg: "Faltam parametros para gerar recomendações."})
        }
    }
}