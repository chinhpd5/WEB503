import express from "express";
import { uploadToServer } from "../controllers/common.controller";
import { uploadMiddlewareServer } from "../middlewares/upload";

const router = express.Router();

router.post('/upload',uploadMiddlewareServer.single("image"),uploadToServer)

export default router;