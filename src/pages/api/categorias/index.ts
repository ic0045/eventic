import type { NextApiRequest, NextApiResponse } from 'next'
import { CategoriaRepo } from '@app/server/database'
import { Categoria } from '@app/server/entities/categoria.entity';

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
                let categoria = await CategoriaRepo.findOne({where: {nome: req.body.nome}})
                if(categoria == null){
                    categoria = Categoria.createFromObject(req.body);
                    categoria = await CategoriaRepo.save(categoria);
                    res.status(200).json(categoria);
                }else{ res.status(400).json("Já existe uma categoria de nome "+req.body.nome)}
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
        const {id, nome, icone} = req.body;
        if(id){
            if(nome && req.body.nome.length < 2){
                res.status(400).json("Nome de categoria inválido");
            }
            else{
                try{
                    let categoria = await CategoriaRepo.findOne({where: {id: id}})
                    if(categoria == null)
                        res.status(400).json("Nenhuma categoria encontrada para id "+id);
                    else{
                        if(nome) categoria.nome = nome;
                        if(icone) categoria.icone = icone;
                        categoria = await CategoriaRepo.save(categoria);
                        res.status(200).json(categoria);
                    }
                }catch(e){res.status(500).json(e)}
            }
        }else(res.status(400).json("Parâmetros inválidos."))
    }

    else if(req.method === 'DELETE'){
        const {id} = req.query;
        if(id){
            try{
                await CategoriaRepo.delete(id);
                res.status(200).json("Categoria deletada com sucesso");
            }catch(e){ res.status(500).json(e); }
        }else{ res.status(400).json("Faltando id de categoria")}
    }
}