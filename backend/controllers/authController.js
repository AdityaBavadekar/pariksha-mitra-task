import User from "../models/User.js";
import bcrypt from "bcrypt";
import {
    generateJwtAndSetCookie,
    JWT_TOKEN_COOKIE_KEY,
} from "../utils/generateJwt.js";
import { isValidEmail } from "../utils/validateEmail.js";

const registerUser = async (req, res) => {
    const { name, email, password, profilePicture, institute, grade } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: true, message: "Incomplete data" });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: true, message: "Invalid email address" });
    }
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                error: true,
                message: "User with that email address already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            institute,
            grade,
            profilePicture
        });
        await user.save();
        res.status(201).json({
            error: false,
            message: "Registration successful",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Error occurred",
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "Incomplete data" });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: true, message: "Invalid email address" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ error: true, message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: true, message: "Incorrect password" });
        }

        user.lastLogin = Date.now();
        await user.save();
        
        generateJwtAndSetCookie(res, { _id: user._id });
        
        res.status(200).json({
            error: false,
            message: "Login successful",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            message: "Error occurred",
        });
    }
};

const logoutUser = async (req, res) => {
    res.clearCookie(JWT_TOKEN_COOKIE_KEY);
    res.status(200).json({ error: false, message: "Logout successful" });
};

export { registerUser, loginUser, logoutUser };