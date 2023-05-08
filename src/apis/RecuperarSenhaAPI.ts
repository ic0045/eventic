import { RecuperarSenhaRequest } from './../interfaces/login_interfaces';
import api from "./config/axiosConfig";

export class RecuperarSenhaAPI {

    static async enviarLink(recuperarSenhaRequest: RecuperarSenhaRequest){
        const response = await api.request({
            url: '/senha/resetar',
            method: 'POST',
            data: recuperarSenhaRequest
        })

        return response.data;
    }
}