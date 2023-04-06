declare global{
    namespace NodeJS{
        interface ProcessEnv{
            DB_NAME: string,
            DB_HOST: string,
            DB_PASSWORD: string,
            DB_PORT: string
            DB_USERNAME: string
        }
    }
}

export {}