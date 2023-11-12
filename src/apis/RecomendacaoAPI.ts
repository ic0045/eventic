import { BaseAPI } from './BaseAPI';

export class RecomendacaoAPI extends BaseAPI {

    static async cadastrar(usuario_id : {usuario_id : string}){
        const response = await fetch(`${this.apiURL}/recomendacao`, {
            method: 'POST',
            body: JSON.stringify(usuario_id),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        return await response.json();    
    }

    static async insereEventoRecomendacao({recomendacao_id, evento_id} : {recomendacao_id: string, evento_id: string}){
        const response = await fetch(`${this.apiURL}/recomendacao`, {
            method: 'PUT',
            body: JSON.stringify({recomendacao_id, evento_id}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });
        return await response.json();    
    }

    
}