/*
* Classe de validação para operações relacionadas a entidade Evento.
*/
export default class EventoValidator {
    /*
    * Campos não nulos da entidade Evento
    */
    static requiredFields = ["descricao", "localizacao", "data_inicial", "titulo", "imagem_url"];

    /*
    *Verifica se a requisição contém todos campos necessários para criação do evento.
    */
    static validateNotNullFields(body: any): [boolean, string] {
        var missingFields = "";
        for (var field of this.requiredFields) {
            if (!body.hasOwnProperty(field)) //if null
                missingFields += `${field}, `;
            else if (typeof body[field] === 'string' && body[field].length === 0) //if length == 0
                missingFields += `${field}, `;
        }

        if (missingFields.length > 0)
            return [false, "Atributos pendentes: " + missingFields];

        return [true, missingFields]
    }
}