import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const secretKey = process.env.KEY;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401);
    }

    console.log("Token received:", token);

    jwt.verify(token, secretKey, (err, data) => {
        if (err) {
            console.log("Error during token verification:", err.message);
            return res.sendStatus(403);
        }

        console.log("Token verified:", data);

        if (data) {
            next();
        } else {
            res.sendStatus(403);
        }
    });
};

export default authenticateJWT;
