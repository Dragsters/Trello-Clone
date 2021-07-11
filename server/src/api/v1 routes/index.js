import { Router } from "express";
import { isAuthorized } from "../middlewares/auth.middle.js";
import { authRouter } from "./auth.routes.js";
import { userRouter } from "./user.routes.js";

const v1 = Router();
v1.use('/user', isAuthorized, userRouter);
v1.use('/auth', authRouter);
v1.post('/t', isAuthorized, (req, res) => {
    console.log(req.cookies);
    res.json({
        cookies: req.cookies,
        msg: `welcome to the v1 routes
     access users from /user endpoint`
    });
});

export default v1;