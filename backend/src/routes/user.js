import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { SmallUserModel } from "../models/SmallUsers.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully" });
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return res
            .status(400)
            .json({ message: "There is no user" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "Password is not valid" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_STRING);
    const smallUsers = await SmallUserModel.find({ userOwner: user._id })
    res.json({ token, userID: user._id, username, smallUsers });
});

export { router as userRouter };

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        try {
            // Bearer kjbkjbsdfkbsjkfd
            const t = authHeader.split(" ")[1]
            console.log(t);
            const decode = await jwt.verify(t, process.env.SECRET_STRING) //TODO -ENV
            const user = await UserModel.findById(decode.id)
            // TODO - if no user - throw
            if (!user) {
                console.log(error)
            } else {
                req.user = user
                next();
            }
        } catch (error) {
            console.log('token ', error);
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};