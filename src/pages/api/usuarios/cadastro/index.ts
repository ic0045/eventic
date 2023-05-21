import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/server/database'
import { Usuario } from '@app/server/entities/usuario.entity'
import {UsuarioValidator, sendConfirmEmail} from '../util'
import { hashPassword } from '../../auth/auth'
import { Permissao } from '@app/common/constants'

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
                    usuario.permissao = Permissao.visitante; //admins não são criados por esta rota
                    usuario.senha = await hashPassword(usuario.senha);
                    console.log("CHECKPOINT 1")
                    usuario = await UsuarioRepo.save(usuario);
                    console.log("CHECKPOINT 2")
                    if( await sendConfirmEmail(usuario.email, usuario.id) ){
                        console.log("CHECKPOINT 1")
                        res.status(200).json({usuario});
                    }
                    else{ //erro ao enviar e-mail, deleta usuário do banco para que seja possível tentar novamente
                        console.log("CHECKPOINT 3")
                        await UsuarioRepo.delete(usuario.id);
                        res.status(500).json({errorMsg: "Erro ao enviar e-mail de confirmação."});
                    }
                }
                else{ res.status(400).json({errorMsg: "Já existe um usuario cadastrado para o e-mail informado."})}
            }catch(e){res.status(500).json(e)}
        }else{ res.status(400).json({errorMsg})}
    }
}