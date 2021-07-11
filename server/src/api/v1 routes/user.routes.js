import { findAll } from "../../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get('/', findAll);
userRouter.get('/t', (req, res) => {
    res.json({
        msg: `Welcome to user routes.
    access all user data by / endpoint`});
});
export { userRouter };