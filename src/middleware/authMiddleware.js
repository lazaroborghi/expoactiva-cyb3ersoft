import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.KEY;

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, data) => {
        if (err) return res.sendStatus(403);

        if (data.authorized) {
            next();
        } else {
            res.sendStatus(403);
        }
    });
};

export default authenticateJWT;
