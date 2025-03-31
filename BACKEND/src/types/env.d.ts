declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string
            DATABASE_URI: string
            ACCESS_TOKEN_SECRET: string
            REFRESH_TOKEN_SECRET: string
            
            PORT: string
        }
    }
}

export { };

