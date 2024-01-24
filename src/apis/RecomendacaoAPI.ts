import { BaseAPI } from './BaseAPI';

export class RecomendacaoAPI extends BaseAPI {

    /*
    * Cadastra uma recomendação. Usado quando o usuário avalia o primeiro evento da recomendação
    * nota : nota do evento avaliado, eventosIds : ids dos eventos da recomendação
    */
    static async cadastrar(usuarioId : string, tipoRecomendacao : number, nota : number, eventosIds : string[] ){
        const response = await fetch(`${this.apiURL}/recomendacao`, {
            method: 'POST',
            body: JSON.stringify({usuarioId, tipoRecomendacao, nota, eventosIds}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        return await response.json();    
    }

    /*
    * Refaz o cáculo da precisão de um evento. Chamado quando o usuário avalia um outro evento
    * de uma recomendação já cadastrada
    */
    static async updateRecomendacao({recomendacaoId} : {recomendacaoId: string}){
        const response = await fetch(`${this.apiURL}/recomendacao`, {
            method: 'PUT',
            body: JSON.stringify({recomendacaoId}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        return await response.json();    
    }

    
}