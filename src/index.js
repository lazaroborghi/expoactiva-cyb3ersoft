import express from 'express';
import db from './model/db.js'; 
import dotenv from 'dotenv';
import { createUser } from './controller/userController.js';
import { getUserByEmail } from './controller/userController.js';
import { newLocation, getLocationsByDateTime, getLocationsByDevice } from './controller/locationController.js';
import { createDevice } from './controller/deviceController.js';
import authenticateJWT from './middleware/authMiddleware.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

// Conectar a MongoDB
db(MONGO_URI);

const app = express();
app.use(express.json());

app.use(authenticateJWT); // Defino middleware para que se pida token

app.post('/user',createUser);
app.post('/location',newLocation);
app.post('/createDevice',createDevice);
app.get('/user/:email',getUserByEmail);
app.get('/locations', getLocationsByDateTime);
app.get('/locations/:device', getLocationsByDevice);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
