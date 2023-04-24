import type { NextApiRequest, NextApiResponse } from 'next'
import { CategoriaRepo, EventoRepo, UsuarioRepo } from '@app/database'
import { validateNotNullFields } from './util';
import { Evento } from '@app/entities/Evento';
import { link } from 'fs';

export default async function handler(
    req : NextApiRequest,
    res: NextApiResponse<any>
) {
    if(req.method === 'POST'){
        const [valid, errorMsg] = validateNotNullFields(req.body);
        if(valid){
            try{
                let usuario = await UsuarioRepo.findOne({where: {id: req.body.usuario_id}});

                if(usuario != null){
                    let categoria = null;
                    if(req.body.categoria_id)
                        categoria = await CategoriaRepo.findOne({where: {id:req.body.categoria_id}});
                    
                    const eventoData = {...req.body,categoria: categoria, criador: usuario};
                    let evento = Evento.createFromObj(eventoData);
                    evento = await EventoRepo.create(evento);
                    res.status(200).json({evento});

                }else{ res.status(400).json("ID de criador de evento inválido.")}
            }catch(e){console.log(e); res.status(500).json({e})}
        }else{ res.status(400).json({errorMsg})}
    }

    else if(req.method === 'GET'){
        const {id, data_inicial, destaque, categoria_id, criador_id, localizacao, titulo} = req.query;
        const where : { [key:string]: any} = {};
        const relations : { [key:string]: any} = {};

        if(id) where.id = id;
        if(titulo) where.id = titulo;
        if(localizacao) where.localizacao = localizacao;
        if(destaque) where.destaque = destaque;
        if(data_inicial) where.dataInicial = data_inicial;
        if(categoria_id){
            where.categoria = {id: categoria_id};
            relations.categoria = true;
        }
        if(criador_id){
            where.criador = {id: criador_id};
            relations.usuario = true;
        }

        try{
            const eventos = await EventoRepo.find({where: where});
            res.status(200).json(eventos);
        }catch(e){console.log(e);res.status(500).json(e)}
    }

    else if(req.method === 'PUT'){
        if(req.body.id){
            try{
                let evento = await EventoRepo.findOne({where: {id: req.body.id}}); 
                if(evento == null){
                    res.status(400).json(`Não foi encontrado evento de id: ${req.body.id}`);
                }else{
                    const {descricao, localizacao, data_inicial, titulo, destaque,
                    imagem_url, data_final, link_imagem, link_titulo,
                    tipo, link_mais_informacoes, categoria_id} = req.body;

                    if(descricao) evento.descricao = descricao;
                    if(localizacao) evento.localizacao = localizacao;
                    if(data_inicial) evento.dataInicial = data_inicial;
                    if(titulo) evento.titulo = titulo;
                    if(destaque) evento.destaque = destaque;
                    if(imagem_url) evento.imagemUrl = imagem_url;
                    if(data_final) evento.datafinal = data_final;
                    if(link_imagem) evento.linkImagem = link_imagem;
                    if(link_titulo) evento.linkTitulo = link_titulo;
                    if(tipo) evento.tipo = tipo;
                    if(link_mais_informacoes) evento.linkMaisInformacoes = link_mais_informacoes;
                    if(categoria_id){
                        let categoria = await CategoriaRepo.findOne({where: {id:categoria_id}});
                        if(categoria)
                            evento.categoria = [categoria]; //REMINDER: Não está atulizando
                    }
                    evento.updatedAt = new Date();

                    evento = await EventoRepo.save(evento);
                    res.status(200).json(evento);
                }
            }catch(e){console.log(e);res.status(500).json({e})}
        }else{ res.status(400).json("Falta id de evento.")}
    }

    else if(req.method === 'POST'){
        const {id} = req.query;
        if(id){
            try{
                await EventoRepo.delete(id);
                res.status(200).json("Evento deletado com sucesso");
            }catch(e){ res.status(500).json(e); }
        }else{ res.status(400).json("Faltando id de evento")}
    }
    
}