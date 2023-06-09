import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/server/database'
import { Usuario } from '@app/server/entities/usuario.entity'
import {UsuarioValidator, sendConfirmEmail} from '../util'
import { hashPassword } from '../../auth/auth'

/*
*   Rota cadastro de usuário. Usuários são criados como visitantes.
*   Restrição:       Nenhuma
*   Nível de acesso: Todos
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method === 'POST'){
        const [valid, errorMsg] = UsuarioValidator.validateRegisterReqBody(req.body);
        if(valid){
            try{
                const existingUsuario = await UsuarioRepo.findOne(
                    {where: {email: req.body.email.toLocaleLowerCase()}});
                if(!existingUsuario){
                    let usuario = Usuario.createFromObj(req.body);
                    usuario.permissao = 'visitante' ; //admins não são criados por esta rota
                    usuario.senha = await hashPassword(usuario.senha);
                    usuario = await UsuarioRepo.save(usuario);
                    if( await sendConfirmEmail(usuario.email, usuario.id) ){
                        res.status(200).json({usuario});
                    }
                    else{ //erro ao enviar e-mail, deleta usuário do banco para que seja possível tentar novamente
                        await UsuarioRepo.delete(usuario.id);
                        res.status(500).json({errorMsg: "Erro ao enviar e-mail de confirmação."});
                    }
                }
                else{ res.status(400).json({errorMsg: "Já existe um usuario cadastrado para o e-mail informado."})}
            }catch(e){res.status(500).json(e)}
        }else{ res.status(400).json({errorMsg})}
    }
}