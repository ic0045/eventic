import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/server/database'
import {UsuarioValidator} from '../util';
import { hashPassword } from '../../auth/auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

/*
*   Rota para alterar senha do usuário logado. Para recuperar senha usar rota recuperasenha.
*   Restrição:       Usuário logado.
*   Nível de acesso: Todos.
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if(req.method === 'POST'){
        const session = await getServerSession(req,res,authOptions)
        if(!session) 
            res.status(401).send("É necessário estar autenticado.");
        else{
            let valid = UsuarioValidator.validatePassword(req.body.senha);
            if(valid){
                try{
                    const user = await UsuarioRepo.findOne({where: {id: session.user.id}});
                    if (user) {
                        user.senha = await hashPassword(req.body.senha);
                        await UsuarioRepo.save(user);
                        res.status(200).json("Senha alterada com sucesso");
                    } else { res.status(400).json("Nenhum usuário encontrado para o id: " + session.user.id) }
                } catch (e) { res.status(500).json(e) }
            }else{res.status(400).send(" Senha inválida.")}
        }       
    }
}