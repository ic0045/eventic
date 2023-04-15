import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter"
import { datasource } from "@app/database"
import { Usuario } from "@app/entities/Usuario"
import { Conta } from "@app/entities/Conta"
import { Sessao } from "@app/entities/Secao"
import { TokenVerificacao } from "@app/entities/TokenVerificacao"

export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],
  adapter: TypeORMLegacyAdapter(datasource.options, { 
    entities: {
    UserEntity: Usuario,
    AccountEntity: Conta,
    SessionEntity: Sessao,
    VerificationTokenEntity: TokenVerificacao
    } 
  }),
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages:{

  },
  callbacks:{

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
  debug: process.env.DEBUG==='true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
  useSecureCookies: false //disable before production
}

export default NextAuth(authOptions)