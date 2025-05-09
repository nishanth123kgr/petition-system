import dotenv from "dotenv"
dotenv.config()

const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  corsOptions: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }
};

export default config;