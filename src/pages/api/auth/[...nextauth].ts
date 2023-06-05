import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { checkPassword, getCustomSession } from "./auth"
import { UsuarioRepo } from "@app/server/database"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "seuemail@dom.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string,
          password: string
        }

        if (email === undefined || password === undefined)
          throw new Error("Dados de login inválidos");

        const usuario = await UsuarioRepo.findOne({
          where: { email: email.toLocaleLowerCase() }
        });

        if (usuario == null)
          throw new Error("Não existe um cadastro para o e-mail informado.");
        if (!usuario.emailConfirmado)
          throw new Error("E-mail ainda não confirmado.");
        if (!await checkPassword(password, usuario.senha))
          throw new Error("Credenciais inválidas.");

          const { primeiroNome, segundoNome, permissao } = usuario;
        return {
          id: usuario.id,
          email: usuario.email,
          primeiroNome, segundoNome, permissao
        }
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      return getCustomSession(session);
    }
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    createUser: async (message: any) => {
      if (process.env.DEBUG === 'true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
        console.log('createUser', message);
      return Promise.resolve()
    },
    linkAccount: async (message: any) => {
      if (process.env.DEBUG === 'true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
        console.log('event.linkAccount', message);
      return Promise.resolve()
    },
    session: async (session: any) => {
      if (process.env.DEBUG === 'true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
        console.log('event.session', session);
      return session
    },
    signIn: async (message: any) => {
      if (process.env.DEBUG === 'true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
        console.log('event.signIn', message);
      return Promise.resolve()
    },
    signOut: async (message: any) => {
      if (process.env.DEBUG === 'true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
        console.log('event.signOut', message);
      return Promise.resolve()
    },
    updateUser: async (message: any) => {
      if (process.env.DEBUG === 'true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
        console.log('event.updateUser', message);
      return Promise.resolve()
    },
  },
  logger: {
    error(code, ...message) {
      console.error(code, message)
    },
    warn(code, ...message) {
      if (process.env.DEBUG === 'true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
        console.warn(code, message)
    },
    debug(code, ...message) {
      if (process.env.DEBUG === 'true' && process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
        console.warn(code, message)
    }
  },
  debug: process.env.DEBUG === 'true' && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
  useSecureCookies: false //disable before production
}

export default NextAuth(authOptions)