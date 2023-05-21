import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/database'
import { sendRecoveryEmail } from '../util';

/*
*   Rota para recuperar senha. Para trocar de senha usar rota trocarsenha.
*   Restrição:       Nenhuma.
*   Nível de acesso: Todos.
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if(req.method === 'POST'){
        const email = req.body.email;
        if(!email) 
            res.status(400).send("E-mail de recuperação não informado.");
        else{
                try{
                    const user = await UsuarioRepo.findOne({where: {email: email}});
                    if (user != null) {
                        if(await sendRecoveryEmail(user.email, user.id))
                            res.status(200).json("E-mail enviado");
                        else res.status(500).json({errorMsg: "Erro ao enviar e-mail de recuperação."})
                    } else { res.status(400).json("Nenhum usuário encontrado para o email: " + email) }
                } catch (e) { res.status(500).json(e) }
            }
        }       
}