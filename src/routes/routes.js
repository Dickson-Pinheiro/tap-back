import { authRouter } from "./auth.routes.js";
import { listsRouter } from "./lists.routes.js";
import { notesRouter } from "./notes.routes.js";
import {Router} from 'express';

const router = Router();

router.use("/auth", authRouter);
router.use("/notes", notesRouter);
router.use("/lists", listsRouter);

export { router };