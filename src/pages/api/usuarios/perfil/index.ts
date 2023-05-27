import type { NextApiRequest, NextApiResponse } from 'next'
import { UsuarioRepo } from '@app/server/database'
import { getToken } from "next-auth/jwt";
import {UsuarioValidator} from '../util';

/*
*   Rota para edição de perfil. Não altera senha, permissão e e-mail.
*   Restrição:       Usuário logado
*   Nível de acesso: Todos
*/
export default async function handler(
    req : NextApiRequest,
    res : NextApiResponse<any>
){
    const token = await getToken({req}) as any;
    if(!token) 
        res.status(401).json({erromsg:"É necessário estar autenticado."});
    else{
        try{
            let usuario = await UsuarioRepo.findOne({where: {id: token.id}});
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
                        usuario.celular = req.body.celular;
                        usuario.fotoPerfil = req.body.foto_perfil;
                        usuario.cpf = req.body.cpf;
                        usuario = await UsuarioRepo.save(usuario);
                        res.status(200).json(usuario);
                    }
                }
            }
        }catch(e){res.status(500).json(e)}
    }
}