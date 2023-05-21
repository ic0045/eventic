import api from "./config/axiosConfig";

export class LoginAPI {

    static async login(loginCredentials: LoginRequest){
        const response = await api.request({
            url: '/auth/login',
            method: 'POST',
            data: loginCredentials
        })

        return response.data;
    }
}