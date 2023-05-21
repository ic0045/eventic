import api from "./config/axiosConfig";

export class CategoriaAPI {

    static async get(categoria: CategoriaGetRequest){
        const response = await api.request({
            url: '/api/categorias',
            method: 'GET',
            data: categoria
        })

        return response.data;
    }
}