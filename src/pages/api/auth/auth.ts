import bcrypt from 'bcrypt'

/*
*  Níveis de permissão de usuário
*/
export enum AcessLevel {
    admin = 'admin', // eslint-disable-line
    tecnico = 'tecnico',// eslint-disable-line
    visitante = 'visitante',// eslint-disable-line
}

const salt = await bcrypt.genSalt(10);

/*
*  Faz o hash de senha
*/
export function hashPassword(password: string) : Promise<string>{
    return bcrypt.hash(password, salt);
}

/*
*  Checa senha
*/
export async function checkPassword(password : string, dbPassword : string) : Promise<boolean>{
    return await bcrypt.compare(password,dbPassword);
}