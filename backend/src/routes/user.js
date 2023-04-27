import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { SmallUserModel } from "../models/SmallUsers.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        await register(username, password)
        res.json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(400).json({ message: error?.message || error });
    }
});

async function register(username, password) {
    const user = await UserModel.findOne({ username });
    if (user) throw "Username already exists"
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    return hashedPassword
}

async function login(username, password) {
    const user = await UserModel.findOne({ username });

    if (!user) throw 'The Username is not valid'
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw 'The Password is not valid'

    const token = jwt.sign({ id: user._id }, process.env.SECRET_STRING);
    const smallUsers = await SmallUserModel.find({ userOwner: user._id })

    return { token, userID: user._id, username, smallUsers, _id: user._id }
}

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await login(username, password)
        res.json(result)
    } catch (error) {
        return res.status(400).json({ message: error?.message || error });
    }
});

router.post("/connect-as-guest", async (req, res) => {
    try {
        const username = `guest${(Math.random() * 1000)}`
        const password = uuidv4()
        await register(username, password)
        const result = await login(username, password)
        res.json(result)
    } catch (error) {
        return res.status(400).json({ message: error?.message || error });
    }
})

export { router as userRouter };

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        try {
            const t = authHeader.split(" ")[1] // Bearer kjbkjbsdfkbsjkfd
            console.log(t);
            const decode = jwt.verify(t, process.env.SECRET_STRING)
            const user = await UserModel.findById(decode.id)
            if (!user) throw 'user not found'
            req.user = user
            next();

        } catch (error) {
            console.log('token ', error);
            return res.status(403).send(error)
        }
    } else {
        res.sendStatus(401);
    }
};