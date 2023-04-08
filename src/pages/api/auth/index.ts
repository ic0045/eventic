import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10);

export function hashPassword(password: string) : Promise<string>{
    return bcrypt.hash(password, salt);
}

export async function checkPassword(password : string, dbPassword : string) : Promise<boolean>{
    return await bcrypt.compare(password,dbPassword);
}