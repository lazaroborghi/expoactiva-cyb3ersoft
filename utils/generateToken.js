import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.KEY;

const payload = { authorized: true };
const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });  // Este token expirará en 7 días.

console.log("Your token:", token);
