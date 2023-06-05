import { BaseAPI } from "./BaseAPI";

export class UsuarioAPI extends BaseAPI {

    static async cadastrar(usuario: UsuarioPostRequest){

        const response = await fetch(`${this.apiURL}/usuarios/cadastro`, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        return response.json();
    }

    static async editar(usuario: UsuarioPutRequest){
        const response = await fetch(`${this.apiURL}/admin/usuarios?id=${usuario.id}`, {
            method: 'PUT',
            body: JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        return response.json();
    }
}