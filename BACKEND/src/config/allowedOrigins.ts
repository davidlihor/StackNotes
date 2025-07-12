import dotenv from 'dotenv'
dotenv.config()

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || []

export default allowedOrigins
