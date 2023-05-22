import { Evento } from '@app/server/entities/evento.entity';
import { BaseAPI } from './BaseAPI';

export class EventoAPI extends BaseAPI {

    static async cadastrar(evento: EventoPostRequest) {
        const response = await fetch(`${this.apiURL}/eventos/gerencia`, {
            method: 'POST',
            body: JSON.stringify(evento),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        return await response.json();
    }

    static async editar(evento: EventoPutRequest){
        const response = await fetch(`${this.apiURL}/eventos/gerencia`, {
            method: 'PUT',
            body: JSON.stringify(evento),
            headers: {"Content-type": "application/json; charset=UTF-8"}

        })

        return await response.json();
    }

    /**
     *  Funcao utilizada para pegar os ultimos x eventos e filtrar.
     * @param evento 
     * @returns 
     */
    static async findLast(startAt: number, pageSize: number) {
        const res = await fetch(`${this.apiURL}/eventos?startAt=${startAt}&pageSize=${pageSize}`)
        return await res.json();
    }

    static async get(eventoId: string): Promise<Evento[]>{
        const res = await fetch(`${this.apiURL}/eventos?id=${eventoId}`)

        return await res.json();
    }
}