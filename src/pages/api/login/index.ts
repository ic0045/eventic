import type { NextApiRequest, NextApiResponse } from 'next';
import { UsuarioRepo } from '@app/database';
import { checkPassword } from './validator';
import { generateToken, generatePayload } from '@app/utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>){
    if(req.method === 'POST'){
        const {email, senha}  = req.body;

        if(email && senha){
            try{
                const usuario = await UsuarioRepo.findOne({where : {email: email}});
                if(usuario == null)
                    res.status(404).json("Não há usuario de email "+email);
                else{
                    if(await checkPassword(senha, usuario.senha)){
                        const token = generateToken(generatePayload(usuario.id, usuario.permissao));
                        res.status(200).json(token);
                    }else{ res.status(401).json("Credenciais incorretas")}
                }
            }catch(e){res.status(500).json({e}) }

        }else{ res.status(400).json("Informe os dados de login") }
    }
}