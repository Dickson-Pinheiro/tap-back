import { Router } from "express";
import { blocksController } from "../controller/blocks.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const blocksRouter = Router();

blocksRouter.post("/", authenticate, blocksController.createBlock);
blocksRouter.get("/:id", authenticate, blocksController.getOne);
blocksRouter.get("/", authenticate, blocksController.getBlocks);
blocksRouter.put("/", authenticate, blocksController.updateBlock);
blocksRouter.delete("/:id", authenticate, blocksController.remove);

export { blocksRouter }