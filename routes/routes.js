import { notesRouter } from "./notes.routes.js";
import {Router} from 'express';

const router = Router();

router.use("/notes", notesRouter);

export { router };