import type { NextApiRequest, NextApiResponse } from 'next'
import { EventoRepo, InscricaoRepo, UsuarioRepo } from '@app/server/database'
import { Usuario } from '@app/server/entities/usuario.entity';
import { Inscricao } from '@app/server/entities/inscricao.entity';
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]';

/*
*   Rota para inscrição em eventos.
*   Restrição:       Usuário logado
*   Nível de acesso: Todos
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const session = await getServerSession(req,res,authOptions)

    if (!session)
        res.status(401).send("É necessário estar autenticado.");
    else{
        /*
        *   Inscreve o usuário logado na sessão no evento.
        *   Query Params:   desinscrever
        *   Body:           (Required): evento_id                 
        */
        if(req.method === 'POST'){
            const {evento_id} = req.body;
            if(evento_id != null){
                try{
                    let evento = await EventoRepo.findOne({where: {id: evento_id}});
                    if(evento != null){
                        let usuario = await UsuarioRepo.findOne({where: {id: session.user.id}}) as Usuario;
                        if(req.query.desinscrever){ //desinscrever
                            const inscricao = await InscricaoRepo.findOne({where: {
                                usuario: {id: usuario.id},
                                evento: {id: evento.id}
                            }});
                            if(inscricao != null){
                                await InscricaoRepo.delete(inscricao.id);
                                res.status(200).json("Inscricao deletada");
                            }else{ res.status(400).json({errorMsg: "O usuario não possui inscrição no evento"})}
                        }
                        else{//inscrever
                            let inscricao = await InscricaoRepo.findOne({where: {usuario: {id: usuario.id}, evento: {id:evento.id}}});
                            if(inscricao != null){//Se usuário já inscrito
                                res.status(200).json({msg: "Usuário já inscrito no evento"});
                                return;
                            }
                            if(new Date(evento.dataInicial).getTime() < Date.now()){ //Verifica se o evento já passou
                                res.status(400).json({errorMsg: "O evento já inicou ou já foi encerrado"});
                                return;
                            }
                            inscricao = new Inscricao();
                            inscricao.evento = evento;
                            inscricao.usuario = usuario;
                            inscricao.createdAt = new Date();
                            await InscricaoRepo.save(inscricao);
                            res.status(200).send(`Usuário ${usuario.primeiroNome} cadastrado no evento ${evento.titulo}.`)
                        } 
                    }
                    else{ res.status(400).send(`O id ${evento_id} não corresponde a nenhum evento.`)}
                }catch(e){res.status(500).json(e)}
            }
            else{ res.status(400).send("ID de evento não informado.")}
        }
    }
}