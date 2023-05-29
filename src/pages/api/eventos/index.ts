import type { NextApiRequest, NextApiResponse } from 'next'
import {  EventoRepo,  } from '@app/server/database'
import { ILike } from "typeorm"

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
    *                    localizacao, titulo, tipo, q, page, limit
    *   Body:           None               
    */
    if(req.method === 'GET'){
        const {id, data_inicial, destaque, categoria_id, criador_id,
             localizacao, titulo,tipo, q, page, limit } = req.query;
        let where : { [key:string]: any} | [] = {};
        const relations : { [key:string]: any} = {};
        const pagination = (limit && typeof limit === 'string' && parseInt(limit) <=50)? parseInt(limit) : 25;
        const pg = (page && typeof page === 'string')? parseInt(page) : 0; 

        if(q && typeof q === 'string'){ //busca geral por trecho
            let trecho = q.trim();
            relations.categoria = true;

            let addWhere : { [key:string]: any} | [] = {};
            if(categoria_id)
                addWhere.categoria = {id: categoria_id};
            if(criador_id){
                addWhere.criador = {id: criador_id};
                relations.criador = true;
            }
            where = [
                {titulo: ILike(`%${trecho}%`), ...addWhere},
                {localizacao: ILike(`%${trecho}%`), ...addWhere},
                {tipo: ILike(`%${trecho}%`), ...addWhere}
            ];
        }else{
            if(id) where.id = id;
            if(titulo && typeof titulo === 'string') 
                where.titulo = ILike(`%${titulo.trim()}%`);
            if(localizacao && typeof localizacao === 'string') 
                where.localizacao = ILike(`%${localizacao.trim()}%`);;
            if(tipo && typeof tipo === 'string') 
                where.tipo = ILike(`%${tipo.trim()}%`);;
            if(destaque) where.destaque = destaque;
            if(data_inicial) where.dataInicial = data_inicial;
            if(categoria_id){
                where.categoria = {id: categoria_id};
                relations.categoria = true;
            }
            if(criador_id){
                where.criador = {id: criador_id};
                relations.criador = true;
            }
        }
        try{
            const eventos = await EventoRepo.find({
                where: where, 
                relations: relations,
                order:{createdAt: "DESC"},
                skip: pagination*pg,
                take: pagination,
            });
            res.status(200).json(eventos);
        }catch(e){console.log(e);res.status(500).json(e)}
    } 
}