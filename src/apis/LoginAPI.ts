import { BaseAPI } from "./BaseAPI";

export class LoginAPI extends BaseAPI {

    static async login(loginCredentials: LoginRequest){
        const response = await fetch(`${this.apiURL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginCredentials),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        
        return await response.json();
    }
}