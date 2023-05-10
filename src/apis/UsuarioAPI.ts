import { UsuarioPostRequest } from './../interfaces/usuario_interfaces';
import api from "./config/axiosConfig";

export class UsuarioAPI {

    static async cadastrar(usuario: UsuarioPostRequest){
        const response = await api.request({
            url: '/api/usuarios/cadastro',
            method: 'POST',
            data: usuario
        })

        return response.data;
    }
}