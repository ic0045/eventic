import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/server/database'
import {UsuarioValidator, sendAlertChangeEmail} from '../util';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

/*
*   Rota para edição e obter perfil. Não altera senha e permissão.
*   Restrição:       Usuário logado
*   Nível de acesso: Todos
*/
export default async function handler(
    req : NextApiRequest,
    res : NextApiResponse<any>
){
    const session = await getServerSession(req,res,authOptions);
    if(!session) 
        res.status(401).send("É necessário estar autenticado.");
    else{
        try{
            let usuario = await UsuarioRepo.findOne({where: {id: session.user.id}});
            if( usuario == null)
                res.status(400).json(`Não foi encontrado usuário de id: ${req.body.id}`);
            else{

                if(req.method === 'GET'){//Retorna informações de perfil do usuário
                    usuario.senha = "---"; //oculta senha hashada
                    res.status(200).json(usuario);
                }

                else if(req.method === 'PUT'){//Atualiza informações de perfil do usuário.
                    const [valid, errorMsg] = UsuarioValidator.validatePerfilReqBody(req.body);
                    if(!valid) res.status(400).send(errorMsg);
                    else{
                        usuario.primeiroNome = req.body.primeiro_nome;
                        usuario.segundoNome = req.body.segundo_nome;
                        usuario.fotoPerfil = req.body.foto_perfil;
                        if(usuario.email != req.body.email){
                            //Se houve mudança de e-mail, notifica email antigo
                            await sendAlertChangeEmail(usuario.email);
                            usuario.email = req.body.email
                        }
                        usuario = await UsuarioRepo.save(usuario);
                        res.status(200).json(usuario);
                    }
                }
            }
        }catch(e){res.status(500).json(e)}
    }
}