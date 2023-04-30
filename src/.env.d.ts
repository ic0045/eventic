declare global{
    namespace NodeJS{
        interface ProcessEnv{
            DB_NAME: string,
            DB_HOST: string,
            DB_PASSWORD: string,
            DB_PORT: string,
            DB_USERNAME: string,
            TOKENSECRET: string,
            DEBUG: string,
            NODE_ENV: string
        }
    }
}

export {}