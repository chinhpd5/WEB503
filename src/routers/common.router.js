import express from 'express';
import { upload, uploadinary } from '../controllers/common.controller';
import { upload as uploadMiddleware} from '../middlewares/upload';
import { upload as uploadinaryMiddleware} from '../middlewares/uploadinary'

const router = express.Router();

router.post('/upload',uploadMiddleware.single("image"),upload)
router.post('/upload-cloudinary',uploadinaryMiddleware.single("image"),uploadinary)

export default router;