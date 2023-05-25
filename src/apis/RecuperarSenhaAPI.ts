import { BaseAPI } from "./BaseAPI";
export class RecuperarSenhaAPI extends BaseAPI {

    static async enviarLink(recuperarSenhaRequest: RecuperarSenhaRequest){
        const response = await fetch(`${this.apiURL}/usuarios/recuperasenha`, {
            method: 'POST',
            body: JSON.stringify(recuperarSenhaRequest),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        return await response.json();
    }

    //Retorna um boolean status.ok indicando se houve sucesso na alteração de senha
    static async alterarSenha(alterarSenhaRequest: AlterarSenhaRequest) : Promise<boolean>{
        const response = await fetch(`${this.apiURL}/usuarios/recuperasenha/redefine`, {
            method: 'POST',
            body: JSON.stringify(alterarSenhaRequest),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        return await response.ok;
    }
}