import { Router } from "express";
import { protect as protectRouter } from "../middlewares/auth.js";
import { getUsersForSidebar, getMessages, sendMessages } from "../controller/message.controller.js";

const router = Router();
router.get("/users",protectRouter,getUsersForSidebar)
router.get("/:id", protectRouter,getMessages)

router.post("/send/:id",protectRouter,sendMessages)

export default router;
