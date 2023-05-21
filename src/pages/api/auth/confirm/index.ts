import type { NextApiRequest, NextApiResponse } from 'next';
import { UsuarioRepo } from '@app/server/database';

/*
* Rota para confirmação de cadastro de usuário
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) { 
    const {confirm} = req.query;
    if(typeof confirm === 'string'){
        const usuario = await UsuarioRepo.findOne({where: {id: confirm}});
        if(usuario != null){
            usuario.emailConfirmado = true;
            await UsuarioRepo.save(usuario);
            res.redirect(process.env.PUBLIC_URL+"/login");
        }
    }
    res.redirect(process.env.PUBLIC_URL+"/login");
  }