import { Router } from "express";
import { notesController } from "../controller/notes.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
const notesRouter = Router();

notesRouter.get("/", authenticate, notesController.getNotes);
notesRouter.get("/:id", authenticate, notesController.getOne);
notesRouter.post("/", authenticate, notesController.createNotes);
notesRouter.put("/:id", authenticate, notesController.updateNote);
notesRouter.delete("/:id", authenticate, notesController.deleteNote);

export {  notesRouter };