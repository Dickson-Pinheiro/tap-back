import { Router } from "express";
import { listsController } from "../controller/lists.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const listsRouter = Router();

listsRouter.get('/', authenticate, listsController.getLists);
listsRouter.get('/:id', authenticate, listsController.getOne);
listsRouter.put('/:id', authenticate, listsController.updateList);
listsRouter.post('/', authenticate, listsController.createList);
listsRouter.delete('/:id', authenticate, listsController.remove);

export { listsRouter }