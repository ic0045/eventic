import { CategoriaRepo, EventoRepo, InscricaoRepo, UsuarioRepo } from "@app/server/database";
import { Categoria } from "@app/server/entities/categoria.entity";
import { Evento } from "@app/server/entities/evento.entity";
import { Usuario } from "@app/server/entities/usuario.entity";
import { ApiResource } from "@app/common/constants";
import ServerAbstractDataProvider from "@app/server/services/abstractdataprovider.service";
import { NextApiRequest, NextApiResponse } from "next";
import { DataProvider, PaginationPayload, SortPayload } from "react-admin";
import { EntitySchema, ObjectLiteral, Repository } from "typeorm";
import { Inscricao } from "@app/server/entities/inscricao.entity";
import EventoDataProvider from "@app/server/services/eventodataprovider.service";
import { getServerSession } from "next-auth";
import InscricaoDataProvider from "@app/server/services/inscricaodataprovider.service";
import UsuarioDataProvider from "@app/server/services/usuariodataprovider.service";

/**
 *  @see https://www.npmjs.com/package/ra-data-simple-rest
 * @param req 
 * @param res 
 * @returns 
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const sessao = await getServerSession(req, res, {});
    const filter: any = req.query?.filter ? JSON.parse(req.query?.filter as string) : undefined;
    
    if (req.query.resource === ApiResource.CATEGORIAS) {
        const provider = new ServerAbstractDataProvider<Categoria>(CategoriaRepo);
        return await execute(req, res, provider);
    }

    if (req.query.resource === ApiResource.USUARIOS) {
        const provider = new UsuarioDataProvider(sessao);
        return await execute(req, res, provider);
    }

    if (req.query.resource === ApiResource.EVENTOS) {
        const provider = new EventoDataProvider(sessao);
        return await execute(req, res, provider);
    }

    if (req.query.resource === ApiResource.INSCRICOES) {
        const provider = new InscricaoDataProvider(sessao);
        return await execute(req, res, provider);
    }
    res.status(400).send(`Falta definir um middleware para o recurso ${req.query.resource}`)
}

async function execute<T extends ObjectLiteral>(
    req: NextApiRequest,
    res: NextApiResponse<any>,
    provider: ServerAbstractDataProvider<T>,
) {
    const id = req.query?.id as string;
    let ids: string[] = [];
    let target: string;

    const sort: SortPayload = req.query?.sort ? JSON.parse(req.query?.sort as string) : undefined;
    const pagination: PaginationPayload = req.query?.pagination ? JSON.parse(req.query?.pagination as string) : undefined;
    const filter: any = req.query?.filter ? JSON.parse(req.query?.filter as string) : undefined;
    const data = req.body;

    if (filter) {
        ids = filter?.ids
        target = filter?.target
    }
    switch (req.method) {
        case 'GET':
            if (id) { // getOne
                const data = await provider.getOne({ id });
                return res.status(200).json(data);
            }
            if (ids) { // getMany
                const data = await provider.getMany({ ids });
                return res.status(200).json(data);
            }
            if (pagination) { // getList
                const data = await provider.getList({ sort, pagination, filter });
                res.setHeader('content-range', data[1])
                return res.status(200).json(data[0]);
            }
            // if (target) { //getManyReference
            //     const data = await provider.getManyReference({ id, target, filter, pagination, sort, meta });
            //     return res.status(200).json(data);
            // }
            break;
        case 'POST':
            if (data) { // CREATE
                const newCategoria = await provider.create({ data });
                return res.status(200).json(newCategoria);
            }
            break;
        case 'PUT':
            if (id && data) { // Update
                const categoria = await provider.update({ id: id, data, previousData: data });
                return res.status(200).json(categoria);
            }
            if (ids && data) {  // UpdateMany
                const resultIds = await provider.updateMany({ ids: ids, data });
                return res.status(200).json(resultIds);
            }
            break;
        case 'DELETE':
            if (id) { // Delete
                const deletedCategoria = await provider.delete({ id: id, previousData: new Categoria() });
                return res.status(200).json(deletedCategoria);
            }
            if (ids) {   //DeleteMany
                const deletedIds = await provider.deleteMany({ ids });
                return res.status(200).json(deletedIds);
            }
            break;

        default:
            break;
    }

    res.status(500);
}
