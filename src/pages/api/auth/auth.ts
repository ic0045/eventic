import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authOptions } from './[...nextauth]';
import { getServerSession } from 'next-auth';

/*
*  Níveis de permissão de usuário
*/
export enum AcessLevel {
    admin = 'admin', // eslint-disable-line
    tecnico = 'tecnico',// eslint-disable-line
    visitante = 'visitante',// eslint-disable-line
}

/*
*  Faz o hash de senha
*/
const salt = await bcrypt.genSalt(10);
export function hashPassword(password: string) : Promise<string>{
    return bcrypt.hash(password, salt);
}

/*
*  Checa senha
*/
export async function checkPassword(password : string, dbPassword : string) : Promise<boolean>{
    return await bcrypt.compare(password,dbPassword);
}

/*
* Função que verifica se usuário possui autorização para acessar um recurso
*/
export async function redirectIfNotAuthorized(req :any, res:any, roleRequired : String){
    const session = await getServerSession(req,res,authOptions);

        if(!session){
            return{
                redirect:{
                    destination: "http://localhost:3000/auth/login",
                    permanet:false,
                }
            }
        }
        if(roleRequired === session.user.permissao){
            return{
                props:{}
            }
        }
        else{
            return{
                destination: "http://localhost:3000/auth/login?error=Forbidden",
                permanet:false,
            }
        }
}

    // const token = await getToken({req});

    // if(!token)
    //     return NextResponse.redirect(new URL('/login'));
    
    // if(token?.permissao == roleRequired)
    //     return true;

    // return NextResponse.redirect(new URL('/accessdenied'));