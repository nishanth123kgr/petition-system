import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const tokenConfig = {
  jwtExpiration: config.jwtExpiration,
};

export const generateToken = (payload, defaultConfig=tokenConfig) => {
  return jwt.sign(payload, config.jwtSecret, defaultConfig);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    console.log(error);
    
    throw new Error('Invalid token');
  }
};

export const setTokenCookie = (res, token) => {
  res.cookie('jwt', token, {
    httpOnly: true,
    domain: '.bluu.in',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000
  });
};