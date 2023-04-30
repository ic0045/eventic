import { EventoPostRequest } from "@app/interfaces/evento_interfaces";
import api from "./config/axiosConfig";

export class EventoAPI {

    static async cadastrar(evento: EventoPostRequest){
        const response = await api.request({
            url: '/eventos',
            method: 'POST',
            data: evento
        })

        return response.data;
    }
}