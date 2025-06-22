import express, { Request, Response } from "express";
import { User } from "../models/user.model";

export const usersRoutes = express.Router();


usersRoutes.post("/create-user", async(req: Request, res: Response) => {
    const body = req.body;
    const user = await User.create(body);
    res.status(201).json({
        message: "Successfully created user",
        success: true,
        user
    })

})

usersRoutes.get("/", async (req: Request, res: Response) => {
    const users = await User.find();
    res.json({
        success: true,
        message: "All users retrieve successful",
        users
    })
})

usersRoutes.get("/:userId", async(req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.status(201).json({
        success: true,
        message: "User retrieve successfully",
        user
    })
})


usersRoutes.patch("/:userId", async(req: Request, res: Response) => {
    const userId = req.params.userId;
    const body = req.body;
    const user = await User.findByIdAndUpdate(userId, body, { new: true })
    res.status(201).json({
        success: true,
        message: "user updated successfully",
        user
    })
})


usersRoutes.delete("/:userId", async(req: Request, res: Response) => {
    const userId = req.params.id;
    const deletedUser = User.findByIdAndDelete(userId);
    res.status(201).json({
        success: true,
        message: "user deleted successfully",
        user: deletedUser
    })
})