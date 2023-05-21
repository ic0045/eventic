
const api = process.env.PUBLIC_URL
export class EventoAPI {

    static async cadastrar(evento: EventoPostRequest) {
        return {};
        // const response = await api.request({
        //     url: '/api/eventos',
        //     method: 'POST',
        //     data: evento
        // })

        // return response.data;
    }
    /**
     *  Funcao utilizada para pegar os ultimos x eventos e filtrar.
     * @param evento 
     * @returns 
     */
    static async findLast(startAt: number, pageSize: number) {
        const res = await fetch(`${api}/api/eventos?startAt=${startAt}&pageSize=${pageSize}`)
        return await res.json();
    }
}