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
    static async findLast(page: number, limit: number) {
        const res = await fetch(`${this.apiURL}/eventos?page=${page}&limit=${limit}`)
        return await res.json();
    }

    static async get(eventoId: string): Promise<Evento[]>{
        const res = await fetch(`${this.apiURL}/eventos?id=${eventoId}`)

        return await res.json();
    }

    /**
     *  Funcao avaliar um evento.
     * @param avaliacao 
     * @returns 
     */
    static async avaliar(avaliacao: AvaliacaoPostRequest) {
        const response = await fetch(`${this.apiURL}/eventos/avaliar?evento_id=${avaliacao.evento_id}`, {
            method: 'POST',
            body: JSON.stringify(avaliacao),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        return await response.json();
    }

    /**
     *  Funcao avaliar obter avaliações de um evento.
     * @param avaliacao 
     * @returns 
     */
     static async getAvaliacoes(evento_id : string) {
        const response = await fetch(`${this.apiURL}/eventos/avaliar?evento_id=${evento_id}`, {
            method: 'GET',
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        return await response.json();
    }

    /**
     *  Funcao para deletar avaliação de um evento.
     * @param avaliacao 
     * @returns 
     */
     static async deleteAvaliacao(evento_id : string) {
        const response = await fetch(`${this.apiURL}/eventos/avaliar?evento_id=${evento_id}`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        return await response.json();
    }
}