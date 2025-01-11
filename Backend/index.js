import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './model/userModel.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
  }));

dotenv.config();

connectDB();

// Middleware to parse JSON requests
app.use(express.json())


// POST: Endpoint to authenticate user during sign-in
app.post('/api/authenticate', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        res.status(200).send({ message: "User found" })
    } catch (err) {
        res.status(500).send({ error: error.message })
    }
})


// POST: Endpoint to sign up (with hashed password)
app.post('/api/signup', async (req, res) => {
    const { email, password, fullName } = req.body;
    console.log("Received user data:", req.body);
    try {
        const hashed = await bcrypt.hash(password, 10)
        const user = new User({ email, password: hashed, fullName })
        await user.save();
        res.status(201).json({ message: "User signed up successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


// POST: Endpoint to hash the new password after resetting
app.post('/api/reset', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const newHashed = await bcrypt.hash(newPassword, 10)
        const user = await User.findOneAndUpdate(
            { email },
            { password: newHashed },
            { new: true }
        )
        
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.status(200).json({ message: "Password successfully reset" })

    } catch (error) {
        res.status(500).json({ error: error.message });
    
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

