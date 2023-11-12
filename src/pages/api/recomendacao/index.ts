import { AvaliacaoRepo, EventoRecomendadoRepo, EventoRepo, RecomendacaoRepo, UsuarioRepo } from '@app/server/database';
import { Avaliacao } from '@app/server/entities/avaliacao.entity';
import { EventoRecomendado } from '@app/server/entities/eventorecomendacao.entity';
import { Recomendacao } from '@app/server/entities/recomendacao.entity';
import { Usuario } from '@app/server/entities/usuario.entity';
import type { NextApiRequest, NextApiResponse } from 'next'

/*
*   Rotas para entidade recomendação
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    //Cadastra recomendação
    if (req.method === 'POST') {
        let { usuario_id } = req.body;
        usuario_id = usuario_id as string;
        try {
            let usuario = await UsuarioRepo.findOne({ where: { id: usuario_id } });
            usuario = usuario as Usuario;
            let recomendacao = new Recomendacao();
            recomendacao.usuario = usuario;
            recomendacao = await RecomendacaoRepo.save(recomendacao);
            res.status(200).json({ "id": recomendacao.id });
        } catch (e) {
            res.status(500).json({ e });
        }
    }

    //Insere evento_recomendacao
    else if (req.method === 'PUT') {
        let { recomendacao_id, evento_id } = req.body;
        recomendacao_id = recomendacao_id as string;
        evento_id = evento_id as string;

        try {
            let recomendacao = await RecomendacaoRepo.findOne({ where: { id: recomendacao_id }, relations: { usuario: true } });
            let evento = await EventoRepo.findOne({ where: { id: evento_id } });

            if(recomendacao == null || evento == null){
                res.status(400).json({Reason: "não encontrada recomendacao ou evento"});
            }else{
                let eventoRec = new EventoRecomendado();
                eventoRec.recomendacao = recomendacao;
                eventoRec.evento = evento;
                eventoRec = await EventoRecomendadoRepo.save(eventoRec);
                res.status(200).json(eventoRec);
            }
        } catch (e) {
            res.status(500).json({ e });
        }
    }

    
    else if(req.method === 'GET'){
        let {recomendacao_id} = req.query;
        let gostou;
        //Get by id
        if(recomendacao_id){
            recomendacao_id = recomendacao_id as string;
            const rec = await RecomendacaoRepo.findOne({where: {id: recomendacao_id}, relations: {usuario: true}});
            if(rec != null){
                gostou = 0;
                const avaliador = (await UsuarioRepo.findOne({where: {id: rec.usuario.id}})) as Usuario;
                const evRecs = await EventoRecomendadoRepo.find({where: {recomendacao: {id: rec.id}}, relations: {evento: true}});
                for(let ev of evRecs){
                    const avaliacao = (await AvaliacaoRepo.findOne({where: {evento: {id: ev.evento.id},  usuario: {id: avaliador.id} }})) as Avaliacao;
                    if(avaliacao.nota >= 3) gostou++;
                    rec.eventosRecomendados.push(ev.evento);
                }
                rec.precisao = evRecs.length/gostou;
            }
            res.status(200).json(rec);
        }
        //Get all
        else{
            const recs = await RecomendacaoRepo.find({relations: {usuario: true}});
            recs.map(async (rec) =>  {
                gostou = 0;
                const avaliador = (await UsuarioRepo.findOne({where: {id: rec.usuario.id}})) as Usuario;
                const evRecs = await EventoRecomendadoRepo.find({where: {recomendacao: {id: rec.id}}, relations: {evento: true}});
                for(let ev of evRecs){
                    const avaliacao = (await AvaliacaoRepo.findOne({where: {evento: {id: ev.evento.id},  usuario: {id: avaliador.id} }})) as Avaliacao;
                    if(avaliacao.nota >= 3) gostou++;
                    rec.eventosRecomendados.push(ev.evento);
                }
                rec.precisao = evRecs.length/gostou;
            })
            res.status(200).json(recs);
        }
    }
}