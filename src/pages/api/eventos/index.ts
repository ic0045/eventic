import type { NextApiRequest, NextApiResponse } from 'next'
import {  EventoRepo,  } from '@app/database'

/*
*   Rota buscar eventos.
*   Restrição:       Nenhum
*   Nível de acesso: Todos
*/
export default async function handler(
    req : NextApiRequest,
    res: NextApiResponse<any>
) {
    /*
    *   Busca eventos.
    *   Query Params:   id, data_inicial, destaque, categoria_id, criador_id,
    *                    localizacao, titulo
    *   Body:           None               
    */
    if(req.method === 'GET'){
        const {id, data_inicial, destaque, categoria_id, criador_id, localizacao, titulo} = req.query;
        const where : { [key:string]: any} = {};
        const relations : { [key:string]: any} = {};

        if(id) where.id = id;
        if(titulo) where.id = titulo;
        if(localizacao) where.localizacao = localizacao;
        if(destaque) where.destaque = destaque;
        if(data_inicial) where.dataInicial = data_inicial;
        if(categoria_id){
            where.categoria = {id: categoria_id};
            relations.categoria = true;
        }
        if(criador_id){
            where.criador = {id: criador_id};
            relations.usuario = true;
        }

        try{
            const eventos = await EventoRepo.find({where: where, relations: relations});
            res.status(200).json(eventos);
        }catch(e){console.log(e);res.status(500).json(e)}
    } 
}