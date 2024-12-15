import express from 'express';
import User from '../Models/userModel.js';

const router = express.Router();

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    try {
        // Sửa lại cách tìm user
        const user = await User.findOne({
            username: username,
            password: password
        });

        if (user) {
            res.send(user);
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, cpassword } = req.body;

        if (password !== cpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newuser = new User({ username, password });
        await newuser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


export default router;