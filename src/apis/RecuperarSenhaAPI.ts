import api from "./config/axiosConfig";

export class RecuperarSenhaAPI {

    static async enviarLink(recuperarSenhaRequest: RecuperarSenhaRequest){
        const response = await api.request({
            url: '/api/usuarios/recuperasenha',
            method: 'POST',
            data: recuperarSenhaRequest
        })

        return response.data;
    }
}