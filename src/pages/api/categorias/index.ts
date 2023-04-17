import type { NextApiRequest, NextApiResponse } from 'next'
import { CategoriaRepo } from '@app/database'
import { Categoria } from '@app/entities/Categoria';

/*
*Valida corpo de requisição
*/
function validateReqBody(body : any) : boolean {
    if(!body.nome)
        return false;
    if(body.nome.length < 2)
        return false;
    return true;
}

export default async function handler(
    req : NextApiRequest,
    res : NextApiResponse<any>
) {
    
    if(req.method === 'POST'){
        if(validateReqBody(req.body)){
            try{
                let categoria = Categoria.createFromObject(req.body);
                categoria = await CategoriaRepo.save(categoria);
                res.status(200).json(categoria);
            }catch(e){res.status(500).json(e)}
        }else{res.status(400).json("Nome de categoria inválido")}
    }

    else if(req.method === 'GET'){
        const {nome,id} = req.query;
        const where : { [key:string]: any} = {}
        if(id) where.id = id;
        if(nome) where.nome = nome;
        try{
            const categorias = await CategoriaRepo.find({where: where});
            res.status(200).json(categorias);
        }catch(e){res.status(500).json(e)}
    }

    else if(req.method === 'PUT'){
        const {id} = req.body.id;
        if(id || !validateReqBody(req.body)){
            try{
                let categoria = await CategoriaRepo.findOne({where: {id: id}})
                if(categoria == null)
                    res.status(400).json("Nenhuma categoria encontrada para id "+id);
                else{
                    categoria = await CategoriaRepo.save(categoria);
                    res.status(200).json(categoria);
                }
            }catch(e){res.status(500).json(e)}
        }else(res.status(400).json("Parâmetros inválidos."))
    }

    else if(req.method === 'DELETE'){
        const {id} = req.query;
        if(id){
            try{
                await CategoriaRepo.delete(id);
                res.status(200).json("Usuario deletado com sucesso");
            }catch(e){ res.status(500).json(e); }
        }else{ res.status(400).json("Faltando id de usuário")}
    }
}