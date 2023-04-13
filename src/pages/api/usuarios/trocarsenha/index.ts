import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/database'
import { hashPassword } from '../../login/validator'

/*
*   Verifica se o corpo da requisição contém id e senha válidos
*/
function validateBody(body : any) : [boolean, string]{
    const {id, senha} = body;
    let res = true, message = "";
    if(!id){
        res = false;
        message+="Id não informado. ";
    }
    if(!senha){
        res = false;
        message+="Nova senha não informada. ";
    } else if(senha.length < 5){
        res = false;
        message+="Tamanho de senha inválido. ";
    }
    return [res,message];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if(req.method === 'POST'){
        const [valid, errorMsg] = validateBody(req.body);
        if(valid){
            try{
                const user = await UsuarioRepo.findOne({where: {id: req.body.id}});
                if(user){
                    user.senha = await hashPassword(req.body.senha);
                    res.status(200).json("Senha alterada com sucesso");
                }else{ res.status(400).json("Nenhum usuário encontrado para o id: "+req.body.id)}
            }catch(e){res.status(500).json(e)}
        }else{ res.status(400).json({errorMsg}) }
    }
}