import { BaseAPI } from "./BaseAPI";

export class CategoriaAPI extends BaseAPI {
    static async get(categoria: CategoriaGetRequest){   
        const response = await fetch(`${this.apiURL}/categorias`);
        return await response.json();
    }
}