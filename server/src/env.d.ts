declare module 'sanitize'

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    PORT: string
    JWT_SECRET: string
  }
}
