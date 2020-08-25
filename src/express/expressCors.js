// Vendors
import cors from 'cors';

const expressCors = cors({
  credentials: true,
  methods: ['GET', 'HEAD', 'PATCH', 'POST'],
  origin: process.env.API_CORS_ALLOWED_ORIGINS
    ? process.env.API_CORS_ALLOWED_ORIGINS.split(',')
    : false,
  allowedHeaders: ['Authorization'],
  exposedHeaders: ['Authorization'],
});

export default expressCors;
