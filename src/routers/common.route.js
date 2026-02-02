import express from "express";
import { uploadToServer, uploadCloudinary} from "../controllers/common.controller";
import { uploadMiddlewareServer,uploadMiddlewareCloudDinary } from "../middlewares/upload";

const router = express.Router();

router.post('/upload',uploadMiddlewareServer.single("image"),uploadToServer)
router.post('/upload-dinary',uploadMiddlewareCloudDinary.single('image'),uploadCloudinary)
export default router;