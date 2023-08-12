import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.KEY;

export const createUser = async (req, res) => {
    const { fullname, email, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword
        });
        
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('Email not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Invalid password');

        const payload = { userId: user._id, email: user.email };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserByEmail = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
