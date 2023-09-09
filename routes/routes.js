import { authRouter } from "./auth.routes.js";
import { notesRouter } from "./notes.routes.js";
import {Router} from 'express';

const router = Router();

router.use("/notes", notesRouter);
router.use("/auth", authRouter);

export { router };