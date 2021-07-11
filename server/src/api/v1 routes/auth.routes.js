import { Router } from "express";
import { authGoogle, signout } from "../../controllers/oauth.controller.js";

const authRouter = Router();

authRouter.post('/google', authGoogle);
authRouter.get('/signout', signout);

export { authRouter };