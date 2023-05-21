import { Permissao } from '@app/common/constants';
import NextAuth from 'next-auth';

declare module "next-auth"{
    interface Session{
        user:{
            id: string,
            name:string,
            primeiroNome:string,
            segundoNome:string,
            permissao: Permissao,
            fotoPerfil: string | null,
        }
    }
}