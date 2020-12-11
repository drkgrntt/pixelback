declare module 'sanitize'

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    PORT: string
    JWT_SECRET: string
    GMAIL: string
    GMAIL_CLIENT_ID: string
    GMAIL_CLIENT_SECRET: string
    GMAIL_REFRESH_TOKEN: string
    APP_BASE_URL: string
    STRIPE_SECRET_KEY: string
  }
}
