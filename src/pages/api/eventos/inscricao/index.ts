import type { NextApiRequest, NextApiResponse } from 'next'
import { EventoRepo, InscricaoRepo, UsuarioRepo } from '@app/server/database'
import { Usuario } from '@app/server/entities/usuario.entity';
import { getToken } from "next-auth/jwt";
import { Inscricao } from '@app/server/entities/inscricao.entity';

/*
*   Rota para inscrição em eventos.
*   Restrição:       Usuário logado
*   Nível de acesso: Todos
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const token = await getToken({ req }) as any;

    if (!token)
        res.status(401).send("É necessário estar autenticado.");
    else{
        /*
        *   Inscreve o usuário logado na sessão no evento.
        *   Query Params:   None
        *   Body:           (Required): evento_id                 
        */
        if(req.method === 'POST'){
            const {evento_id} = req.body;
            if(evento_id != null){
                try{
                    let evento = await EventoRepo.findOne({where: {id: evento_id}});
                    if(evento != null){
                        let usuario = await UsuarioRepo.findOne({where: {id: token.id}}) as Usuario;
                        const inscricao = new Inscricao();
                        inscricao.evento = evento;
                        inscricao.usuario = usuario;
                        inscricao.createdAt = new Date();
                        await InscricaoRepo.save(inscricao);
                        res.status(200).send(`Usuário ${usuario.primeiroNome} cadastrado no evento ${evento.titulo}.`)
                    }
                    else{ res.status(400).send(`O id ${evento_id} não corresponde a nenhum evento.`)}
                }catch(e){res.status(500).json(e)}
            }
            else{ res.status(400).send("ID de evento não informado.")}
        }
    }
}