import { Evento } from './../entities/Evento';
import { EventoPostRequest } from "@app/interfaces/evento_interfaces";
import api from "./config/axiosConfig";

export class EventoAPI {

    static async cadastrar(evento: EventoPostRequest){
        const response = await api.request({
            url: '/api/eventos',
            method: 'POST',
            data: evento
        })

        return response.data;
    }

    static async get(eventoId: string): Promise<Evento[]>{
        const response = await api.request({
            url: `/api/eventos?id=${eventoId}`,
            method: 'GET'
        })

        return response.data;
    }
}