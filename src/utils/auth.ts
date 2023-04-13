import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config();

/*
*  Níveis de permissão de usuário
*/
export enum AcessLevel{
    admin = 'admin',
    tecnico = 'tecnico',
    visitante = 'visitante',
}

/*
*  Payload para token
*/
type payloadObj = {
    userId: string,
    userLevel: AcessLevel.admin | AcessLevel.tecnico | AcessLevel.visitante,
}

/*
*  Gera token a partir de payload;
*/
export function generateToken(payload : payloadObj){
    return jwt.sign(payload, process.env.TOKENSECRET);
}

/*
*  Obtém token do payload;
*/
function getPayload(token: string) : any{
    jwt.verify(token, process.env.TOKENSECRET, (err,payload) => {
        if(err)
            return false;
        else{
            return payload;
        }        
    })
}

/*
*  Valida nível de acesso informado no token;
*/
export function validateAccessPermision(permission : string, token : string) : boolean{
    const payload = getPayload(token);
    if(payload && payload.userLevel === permission)
        return true;
    return false;
}

/*
*   Funções para gerar payload a partir de nível de permissão
*/
export function generatePayload(id: string, permission: string) : payloadObj{
    switch(permission){
        case "admin":       return {userId: id, userLevel: AcessLevel.admin};
        case "tecnico":     return {userId: id, userLevel: AcessLevel.tecnico};
        case "visitante":   return {userId: id, userLevel: AcessLevel.visitante};
    }
    throw new Error("Error generating payload: Invalid access level");
}