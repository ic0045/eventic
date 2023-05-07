import type { NextApiRequest, NextApiResponse } from 'next'
import { CategoriaRepo, EventoRepo, UsuarioRepo } from '@app/database'
import EventoValidator from '../util';
import { Evento } from '@app/entities/Evento';
import { getToken } from "next-auth/jwt";
import { AcessLevel } from '../../auth/auth';

/*
*   Rota para gerencia de eventos.
*   Restrição:       Usuário logado
*   Nível de acesso: Professor e Admin
*/
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const token = await getToken({ req }) as any;

    if (!token)
        res.status(401).send("É necessário estar autenticado.");
    else if (token.permissao == AcessLevel.visitante)
        res.status(401).send("É necessário ser um administrador ou professor para cadastrar um evento.")
    else {

        /*
        *   Cadastra um evento tendo como criador o usuário logado na sessão.
        *   Query Params:   None
        *   Body:           (Required): "descricao", "localizacao","data_inicial",
        *                   "titulo", "imagem_url",
        *                   (Optional): "tipo", "link_imagem", "link_titulo", 
        *                   "link_mais_infomacoes", "categoria_id", "data_final"                  
        */
        if (req.method === 'POST') {
            const [valid, errorMsg] = EventoValidator.validateNotNullFields(req.body);
            if (valid) {
                try {
                    let usuario = await UsuarioRepo.findOne({ where: { id: token.id } });

                    if (usuario != null) {
                        let categoria = null;
                        if (req.body.categoria_id) //Categoria é opcional, pode se trocar por 'tipo' 
                            categoria = await CategoriaRepo.findOne({ where: { id: req.body.categoria_id } });

                        const eventoData = { ...req.body, categoria: categoria, criador: usuario };
                        let evento = Evento.createFromObj(eventoData);

                        evento = await EventoRepo.save(evento);
                        res.status(200).json(evento);

                    } else { res.status(400).json("ID de criador de evento inválido.") }
                } catch (e) { console.log(e); res.status(500).json({ e }) }
            } else { res.status(400).json({ errorMsg }) }
        }

        /*
        *   Edita um evento. Se usuário for professor, apenas eventos que ele criou.
        *   Se usuário for professor, não consegue colocar evento em destaque.
        *   Query Params:   None
        *   Body:           (Required): "id", "descricao", "localizacao","data_inicial",
        *                   "titulo", "imagem_url",
        *                   (Optional): "tipo", "link_imagem", "link_titulo", 
        *                   "link_mais_infomacoes", "categoria", "data_final", "destaque"                  
        */
        else if (req.method === 'PUT') {
            if (req.body.id) {
                const [valid, errorMsg] = EventoValidator.validateNotNullFields(req.body);

                if (valid) {
                    let evento = await EventoRepo.findOne({ where: { id: req.body.id } });
                    if (evento == null)
                        res.status(400).json(`Não foi encontrado evento de id: ${req.body.id}`);
                    else {
                        let canDelete = token.permissao == AcessLevel.admin;
                        if (!canDelete) //se usuário é professor, verifica se é criador do evento
                            canDelete = evento.criador.id == token.id;
                        if (canDelete) {
                            const { descricao, localizacao, data_inicial, titulo, destaque,
                                imagem_url, data_final, link_imagem, link_titulo,
                                tipo, link_mais_informacoes, categoria_id } = req.body;
                            try {
                                evento.descricao = descricao;
                                evento.localizacao = localizacao;
                                evento.dataInicial = data_inicial;
                                evento.titulo = titulo;
                                evento.imagemUrl = imagem_url;
                                if (data_final) evento.datafinal = data_final;
                                if (link_imagem) evento.linkImagem = link_imagem;
                                if (link_titulo) evento.linkTitulo = link_titulo;
                                if (tipo) evento.tipo = tipo;
                                if (link_mais_informacoes) evento.linkMaisInformacoes = link_mais_informacoes;
                                if (categoria_id) {
                                    let categoria = await CategoriaRepo.findOne({ where: { id: categoria_id } });
                                    if (categoria)
                                        evento.categoria = categoria;
                                }
                                if (destaque && token.permissao == AcessLevel.admin)//apenas admin pode colocar como destaque
                                    evento.destaque = destaque;
                                evento.updatedAt = new Date();
                                evento = await EventoRepo.save(evento);
                                res.status(200).json(evento);
                            }catch (e) { console.log(e); res.status(500).json({ e }) }                            
                        } else {
                            res.status(401).send(`O evento de id ${req.body.id} não é de sua autoria.`);
                        }
                    }
            } else { res.status(400).send(errorMsg)}
        }else { res.status(400).json("Falta id de evento.") }
    }
    /*
    *   Deleta um evento. Se usuário for professor, apenas eventos que ele criou.
    *   Query Params:   id
    *   Body:           None                  
    */
    else if (req.method === 'DELETE') {
        const { id } = req.query;
        if (id) {
            let canDelete = token.permissao == AcessLevel.admin;
            if (!canDelete) { //se usuário é professor
                let evento = await EventoRepo.findOne({ where: { id: token.id } });
                if (evento != null)// se usuário é criador do evento
                    canDelete = evento.criador.id == token.id;
            }
            if (canDelete) {
                try {
                    await EventoRepo.delete(id);
                    res.status(200).json("Evento deletado com sucesso");
                } catch (e) { res.status(500).json(e); }
            } else {
                res.status(401).send(`O evento de id ${id} não é de sua autoria.`)
            }
        } else { res.status(400).json("Faltando id de evento") }
    }

}
}