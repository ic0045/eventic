import type { NextApiRequest, NextApiResponse } from 'next'
import { CategoriaRepo, EventoRepo, UsuarioRepo } from '@app/database'
import { validateNotNullFields } from './util';
import { Usuario } from '@app/entities/Usuario';
import { Evento } from '@app/entities/Evento';
import { Categoria } from '@app/entities/Categoria';

export default async function handler(
    req : NextApiRequest,
    res: NextApiResponse<any>
) {

    if(req.method === 'POST'){
        const [valid, errorMsg] = validateNotNullFields(req.body);
        if(valid){
            try{
                //(REMINDER): Alterar para pegar usuário da sessão
                let usuario = (await UsuarioRepo.find())[0];
                //(REMINDER): Receber categoria da requisição
                let categoria = (await CategoriaRepo.find())[0];
                //------
                
                const eventoData = {...req.body, criador: usuario};
                // if(req.body.categoria)
                //     eventoData["categoria"] = Categoria.createFromCategoriaObject(req.body.categoria);
                eventoData["categoria"] = categoria;

                let evento = Evento.createFromObj(eventoData);

                console.log("Before save")
                console.log(evento);

                evento = await EventoRepo.create(evento);
                res.status(200).json({evento});

            }catch(e){console.log(e); res.status(500).json({e})}
        }else{ res.status(400).json({errorMsg})}
    }
    
}