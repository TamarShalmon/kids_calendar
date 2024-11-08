import express from "express";
import { SmallUserModel } from '../models/SmallUsers.js'
import { verifyToken } from "./user.js";

const router = express.Router();

router.post('/create-user', [verifyToken], async (req, res) => {
    try {
        const newUser = await SmallUserModel.create({ name: req.body.name, userOwner: req.user._id })
        res.send(newUser)
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "can't create this user"});} 
})

router.put('/update/:id', [verifyToken], async (req, res) => {
    try {
        const { params, body } = req
        console.log(params, body.week[6]);
        const updatedUser = await SmallUserModel.findByIdAndUpdate(params.id, body, { new: true })
        console.log(updatedUser.week[6]);
        res.send(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "can't update this user"});
    }
})

// localhost:3001/read=one/k8jd8jnbf77sj88dj
router.get('/read-one/:id', [verifyToken], async (req, res) => {
    const id = req.params.id

    try {
        const foundUser = await SmallUserModel.findById(id)
        res.send(foundUser)
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "can't found this user"});
    }
})

router.delete('/delete-one/:id', [verifyToken], async (req, res) => {
    const id = req.params.id

    try {
         await SmallUserModel.findByIdAndDelete(id)
         const smallUsers = await SmallUserModel.find({ userOwner: req.user?._id })

        res.send(smallUsers)
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "can't delete this user"});
    }
})


export { router as SmallUserRouter };

