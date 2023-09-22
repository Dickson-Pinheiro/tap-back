import { authRouter } from "./auth.routes.js";
import { listsRouter } from "./lists.routes.js";
import { notesRouter } from "./notes.routes.js";
import { blocksRouter } from "./blocks.routes.js";
import {Router} from 'express';

const router = Router();

router.use("/auth", authRouter);
router.use("/notes", notesRouter);
router.use("/lists", listsRouter);
router.use("/blocks", blocksRouter);

export { router };