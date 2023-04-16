/**
 * Campos necessários para se criar evento
 */
 const requiredFields = ["descricao","localizacao","data_inicial","titulo","imagem_url"];

export function validateNotNullFields(body : any) : [boolean,string] {
    var missingFields = "";
    for(var field of requiredFields){
        if(!body.hasOwnProperty(field)) //if null
            missingFields += `${field}, `;
        else if(typeof body[field] === 'string' && body[field].length === 0) //if length == 0
            missingFields += `${field}, `;
    }

    if(missingFields.length > 0)
        return [false, "Atributos pendentes: "+missingFields];

    return [true, missingFields]
}