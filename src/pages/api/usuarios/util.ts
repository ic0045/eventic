/*
* Classe de validação para operações relacionadas a entidade Usuario.
*/
export default class UsuarioValidator{
    /*
    * Campos não nulos da entidade usuário
    */
    static notNullFields = ["primeiro_nome","segundo_nome","email","senha","permissao"]; 
   
    /*
    * Campos para corpo de requisição alterar perfil
    */
    static perfilBodyFields = ["primeiro_nome","segundo_nome","email_confirmado",
    "celular","foto_perfil","cpf"]
   
    /*
    * Valida corpo de requisição para cadastro de usuário
    */
    static validateRegisterReqBody(body : any) : [boolean, string]{
        let missingFields = "";
        for(let field of this.notNullFields){
            if(!body.hasOwnProperty(field)) //if null
                missingFields += `${field}, `;
            else if(body[field].length === 0) //if length == 0
                missingFields += `${field}, `;
        }
    
        if(missingFields.length > 0)
            return [false, "Atributos pendentes: "+missingFields];
    
        if(!this.validateEmail(body.email))
            return [false, "E-mail inválido."];
    
        if(!this.validateNames(body.primeiro_nome, body.segundo_nome))
            return [false, "Nome de usuário inválido."];

        if(!this.validatePassword(body.senha))
            return [false, "Senha inválida"];
    
        return [true, missingFields]
    }

    /*
    * Valida corpo de requisição para alterar perfil contém campos necessários
    */
    static validatePerfilReqBody(body : any) : [boolean, string]{
        let missingFields = "";
        for(let field of this.perfilBodyFields)
            if(!body.hasOwnProperty(field))
                missingFields += `${field}, `;
        if(missingFields.length > 0)
            return [false, "Atributos pendentes: "+missingFields];
        if(!this.validateNames(body.primeiro_nome, body.segundo_nome))
            return [false, "Nomes de usuário inválidos."];
        return [true, missingFields]
    }

    /*
    * Valida corpo de requisição para alteração de perfil feita por admin.
    * Utiliza validatePerfilReqBody e requer email, permissão.
    * Senha opcional
    */
    static validateAdminPutPerfil(body: any): [boolean, string] {
        let [valid, errorMsg] = this.validatePerfilReqBody(body);
        if (valid) {
            let missingFields = "";
            if(!body.hasOwnProperty("email"))
                missingFields += `email, `;
            if(!body.hasOwnProperty("permissao"))
                missingFields += `permissao, `;
            if(missingFields.length > 0)
                return [false, "Atributos pendentes: "+missingFields];
            if(body.hasOwnProperty("senha") && !this.validatePassword(body.senha))
                return [false, "Senha inválida"];
            return [true, missingFields];
        }
        else return [valid, errorMsg];
    }

    /*
    * Valida nomes de usuário
    */
    static validateNames(firstName: string, secName: string): boolean {
        if(/\d/.test(firstName) || /\d/.test(secName)) //verifica se tem número
            return false;
        if(firstName.length < 2 || secName.length < 2)
            return false;
        return true;
    }

    /*
     * Valida email de usuário
     */
    static validateEmail(email: string): boolean {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
        return regex.test(email);
    }

    /*
     * Valida cpf do usuário
     */
    static validateCpf(cpf : string) : boolean{
        if(cpf.length < 11)
            return false;
        if(/[a-zA-Z]/.test(cpf))
            return false;
        const digitsMatch = cpf.match(/\d/g);
        const digits : number = digitsMatch? digitsMatch.length : 0;
        if(digits < 11)
            return false;
        return true;
    }

    /*
     * Valida senha do usuário
     */
    static validatePassword(password : string) : boolean{
        if(password != null && password.length < 6)
            return false;
        return true;
    }
}