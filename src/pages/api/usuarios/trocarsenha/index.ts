import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/database'
import UsuarioValidator from '../util';
import { hashPassword } from '../../auth/auth';
import { getToken } from "next-auth/jwt";

/*
*   Rota para alterar senha do usuário logado. Para recuperar senha usar outra rota.
*   Restrição:       Usuário logado.
*   Nível de acesso: Todos.
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if(req.method === 'POST'){
        const token = await getToken({req}) as any;
        if(!token) 
            res.status(401).send("É necessário estar autenticado.");
        else{
            let valid = UsuarioValidator.validatePassword(req.body.senha);
            if(valid){
                try{
                    const user = await UsuarioRepo.findOne({where: {id: token.id}});
                    if (user) {
                        user.senha = await hashPassword(req.body.senha);
                        await UsuarioRepo.save(user);
                        res.status(200).json("Senha alterada com sucesso");
                    } else { res.status(400).json("Nenhum usuário encontrado para o id: " + token.id) }
                } catch (e) { res.status(500).json(e) }
            }else{res.status(400).send(" Senha inválida.")}
        }       
    }
}