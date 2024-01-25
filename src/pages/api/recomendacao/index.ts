import { AvaliacaoRepo, EventoRecomendadoRepo, RecomendacaoRepo, UsuarioRepo } from '@app/server/database';
import { EventoRecomendado } from '@app/server/entities/eventorecomendacao.entity';
import { Recomendacao } from '@app/server/entities/recomendacao.entity';
import { Usuario } from '@app/server/entities/usuario.entity';
import { Evento } from '@app/server/entities/evento.entity';
import type { NextApiRequest, NextApiResponse } from 'next'
import {In} from 'typeorm'
import { TipoRecomendacao } from '@app/common/constants';

/*
*   Rotas para entidade recomendação
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    //Cadastra recomendação
    //Chamado ao avaliar ao menos um evento da recomendacao
    if (req.method === 'POST') {
        let { usuarioId, tipoRecomendacao, nota, eventosIds } 
            : { usuarioId: string, tipoRecomendacao: number, nota: number, eventosIds: string[] } = req.body;
        try {
            let usuario : Usuario = (await UsuarioRepo.findOne({ where: { id: usuarioId } }))!;

            let recomendacao = new Recomendacao();
            recomendacao.usuario = usuario;
            recomendacao.tipoRecomendacao = tipoRecomendacao;
            recomendacao.quantidadeRecomendados= eventosIds.length;
            recomendacao.precisao = nota >= 3? 1/eventosIds.length : 0;
            recomendacao = await RecomendacaoRepo.save(recomendacao);

            let evento = new Evento();
            for(let id of eventosIds){
                let eventoRecomendado = new EventoRecomendado();
                evento.id = id;
                eventoRecomendado.evento = evento;
                eventoRecomendado.recomendacao = recomendacao;
                await EventoRecomendadoRepo.save(eventoRecomendado);
            }

            res.status(200).json({ "id": recomendacao.id });
        } catch (e) {
            res.status(500).json({ e });
        }
    }

    //Insere evento_recomendacao
    else if (req.method === 'PUT') {
        let { recomendacaoId } : { recomendacaoId: string} = req.body;

        try {
            let recomendacao = (await RecomendacaoRepo.findOne({ where: { id: recomendacaoId }, relations: ["usuario", "eventosRecomendados", "eventosRecomendados.evento"] }))!;
            const eventosIds = recomendacao.eventosRecomendados.map(eventoRecomendado => eventoRecomendado.evento.id);
            const avaliacoes = await AvaliacaoRepo.find({where: {evento: {id:  In(eventosIds)}, usuario: {id: recomendacao.usuario.id}}, relations:{evento: true}});
            let eventosApreciados = avaliacoes.filter(avaliacao => avaliacao.nota >= 3).length;

            recomendacao.precisao = eventosApreciados/recomendacao.quantidadeRecomendados;
            await RecomendacaoRepo.save(recomendacao)

            res.status(200).json({eventosAvaliados: avaliacoes.length, precisao: recomendacao.precisao});
        } catch (e) {
            res.status(500).json({ e });
        }
    }

    /*
    * Obtém estatísticas de precisão das recomendações
    */
    else if (req.method === 'GET') {
        try {
            const response = await getEstatisticasRecomedacoes();
            res.status(200).json(response);
        }catch (e) {
            res.status(500).json({ e });
        }
    }

    
    // else if(req.method === 'GET'){
    //     let {recomendacao_id} = req.query;
    //     let gostou;
    //     //Get by id
    //     if(recomendacao_id){
    //         recomendacao_id = recomendacao_id as string;
    //         const rec = await RecomendacaoRepo.findOne({where: {id: recomendacao_id}, relations: {usuario: true}});
    //         if(rec != null){
    //             gostou = 0;
    //             const avaliador = (await UsuarioRepo.findOne({where: {id: rec.usuario.id}})) as Usuario;
    //             const evRecs = await EventoRecomendadoRepo.find({where: {recomendacao: {id: rec.id}}, relations: {evento: true}});
    //             for(let ev of evRecs){
    //                 const avaliacao = (await AvaliacaoRepo.findOne({where: {evento: {id: ev.evento.id},  usuario: {id: avaliador.id} }})) as Avaliacao;
    //                 if(avaliacao.nota >= 3) gostou++;
    //                 rec.eventosRecomendados.push(ev.evento);
    //             }
    //             rec.precisao = evRecs.length/gostou;
    //         }
    //         res.status(200).json(rec);
    //     }
    //     //Get all
    //     else{
    //         const recs = await RecomendacaoRepo.find({relations: {usuario: true}});
    //         recs.map(async (rec) =>  {
    //             gostou = 0;
    //             const avaliador = (await UsuarioRepo.findOne({where: {id: rec.usuario.id}})) as Usuario;
    //             const evRecs = await EventoRecomendadoRepo.find({where: {recomendacao: {id: rec.id}}, relations: {evento: true}});
    //             for(let ev of evRecs){
    //                 const avaliacao = (await AvaliacaoRepo.findOne({where: {evento: {id: ev.evento.id},  usuario: {id: avaliador.id} }})) as Avaliacao;
    //                 if(avaliacao.nota >= 3) gostou++;
    //                 rec.eventosRecomendados.push(ev.evento);
    //             }
    //             rec.precisao = evRecs.length/gostou;
    //         })
    //         res.status(200).json(recs);
    //     }
    // }
}

/*
* Obtém estatísticas de precisão das recomendações
*/
export async function getEstatisticasRecomedacoes(){
    const recomendacoesFC = await RecomendacaoRepo.find({where:
        { quantidadeRecomendados: 5, tipoRecomendacao: TipoRecomendacao.FILTRAGEM_COLABORATIVA }});
    const recomendacoesSC = await RecomendacaoRepo.find({where:
        { quantidadeRecomendados: 5, tipoRecomendacao: TipoRecomendacao.SIMLIARIDADE_COSSENO }});
    const recomendacoesHB = await RecomendacaoRepo.find({where:
        { quantidadeRecomendados: 5, tipoRecomendacao: TipoRecomendacao.HIBRIDA }});

    const buildEstatisticas = (tipoRecomendacaoArray : Recomendacao[], nome : String) => {
        return {
            id: nome,
            total: tipoRecomendacaoArray.length,
            precisaoMedia: tipoRecomendacaoArray.length == 0?
                0
                :
                tipoRecomendacaoArray.reduce((total, rec : Recomendacao) => rec.precisao+total, 0)/tipoRecomendacaoArray.length
        }
    };

    return [
        buildEstatisticas(recomendacoesFC, "Filtragem Colaborativa"),
        buildEstatisticas(recomendacoesSC, "Similaridade Cosseno"),
        buildEstatisticas(recomendacoesHB, "Híbrida") ,
    ];
}