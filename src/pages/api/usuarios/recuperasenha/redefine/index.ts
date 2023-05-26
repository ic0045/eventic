import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/server/database'
import { hashPassword } from '@app/pages/api/auth/auth';

/*
*   Rota para confirmação de recuperação de senha
*   Restrição:       Nenhuma.
*   Nível de acesso: Chamado apenas pela página de recuperação.
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if(req.method === 'POST'){
        const {id, senha} = req.body;
        if(!id || !senha) 
            res.status(400).send("Id ou senha de recuperação não informado.");
        else{
                try{
                    const user = await UsuarioRepo.findOne({where: {id: id}});
                    if (user != null) {
                        user.senha = await hashPassword(senha);
                        await UsuarioRepo.save(user);
                        res.status(200).json("Senha alterada com sucesso.")
                    } else { res.status(400).json("Nenhum usuário encontrado para o id: " + id) }
                } catch (e) { res.status(500).json(e) }
            }
        }       
}