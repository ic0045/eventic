import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import { checkPassword } from "./auth"
import { UsuarioRepo } from "@app/database"
// import { JWT } from "next-auth/jwt"

// interface jwtUsuario{
//   primeiroNome: string,
//   segundoNome: string,
//   id: string,
//   permissao: string,
//   fotoPerfil: string | null,
// }

export const authOptions : NextAuthOptions = {
  providers: [
    CredentialsProvider({
        name: "Credenciais",
        credentials: {
          email: {label:"E-mail", type: "text", placeholder: "seuemail@dom.com"},
          password: { label: "Senha", type: "password" }
        },
        async authorize(credentials) {
          const { email, password } = credentials as {
            email: string,
            password: string
          }

          if(email === undefined || password === undefined)
            return null;

          try{
            const usuario = await UsuarioRepo.findOne({
              where: {email: email.toLocaleLowerCase()}
            });

            if(usuario == null)
              throw new Error("Não existe um cadastro para o e-mail informado.");
            if(!await checkPassword(password, usuario.senha))
              throw new Error("Credenciais inválidas.");

            return {
              id: usuario.id,
              primeiroNome: usuario.primeiroNome,
              segundoNome: usuario.segundoNome,
              fotoPerfil: usuario.fotoPerfil,
              permissao: usuario.permissao
            }
        }catch(e){console.log(e); throw new Error("Erro ao buscar usuário.");}
        }   
    })
  ],
  callbacks:{
    async jwt({ token, user } ) {
        return {...token, ...user}
    },
    async session({session,token}){
        session.user = token as any;
        return session;
    }
  },
  pages:{
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events:{
    createUser: async (message: any) => {
      if (process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
          console.log('createUser', message);
      return Promise.resolve()
    },
    linkAccount: async (message: any) => {
        if (process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
            console.log('linkAccount', message);
        return Promise.resolve()
    },
    session: async (message: any) => {
        if (process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
            console.log('session', message);
        return Promise.resolve()
    },
    signIn: async (message: any) => {
        if (process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
            console.log('signIn', message);
        return Promise.resolve()
    },
    signOut: async (message: any) => {
        if (process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
            console.log('signOut', message);
        return Promise.resolve()
    },
    updateUser: async (message: any) => { 
        if (process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
        console.log('updateUser', message);
        return Promise.resolve() 
    },
  },
  logger: {
    error(code, ...message) {
        console.error(code, message)
    },
    warn(code, ...message) {
        if (process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
            console.warn(code, message)
    },
    debug(code, ...message) {
        if (process.env.DEBUG==='true' && process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
            console.warn(code, message)
    }
  },
  debug: process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
  useSecureCookies: false //disable before production
}

export default NextAuth(authOptions)