import express from 'express';
import db from './model/db.js'; 
import dotenv from 'dotenv';
import { createUser } from './controller/userController.js';
import { getUserByEmail } from './controller/userController.js';
import { newLocation } from './controller/locationController.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

// Conectar a MongoDB
db(MONGO_URI);

const app = express();
app.use(express.json());

app.post('/user',createUser);
app.post('/location',newLocation);	
app.get('/user/:email',getUserByEmail);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
