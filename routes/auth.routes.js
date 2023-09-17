import { Router } from "express";
import { authController } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post('/signin', authController.signin);
authRouter.post('/signup', authController.signup);
authRouter.post('/verify', authController.verifyToken);

export { authRouter };