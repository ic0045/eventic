/**
 * Campos não nulos da entidade usuário
 */
const notNullFields = ["primeiro_nome","segundo_nome","email","senha","permissao"];

/**
 * Checa se o corpo da requisição contém os campos necessários não nulos
 */
export function validateNotNullFields(body : any) : [boolean, string]{
    var missingFields = "";
    for(var field of notNullFields){
        if(!body.hasOwnProperty(field)) //if null
            missingFields += `${field}, `;
        else if(body[field].length === 0) //if length == 0
            missingFields += `${field}, `;
    }

    if(missingFields.length > 0)
        return [false, "Atributos pendentes: "+missingFields];

    if(!validateEmail(body.email))
        return [false, "E-mail inválido."];

    if(!validateNames(body.primeiro_nome, body.segundo_nome))
        return [false, "Nome de usuário inválido."];

    return [true, missingFields]
}

/**
 * Valida nomes de usuário
 */
 function validateNames(firstName: string, secName: string): boolean {
    if(/\d/.test(firstName) || /\d/.test(secName)) //verifica se tem número
        return false;
    return true;
}

/**
 * Valida email de usuário
 */
 function validateEmail(email: string): boolean {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    return regex.test(email);
}

/**
 * Valida cpf do usuário
 */
export function validateCpf(cpf : string) : boolean{
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

