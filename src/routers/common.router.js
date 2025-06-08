import express from 'express';
import { upload } from '../controllers/common.controller';
import { upload as uploadMiddleware} from '../middlewares/upload'

const router = express.Router();

router.post('/upload',uploadMiddleware.single("image"),upload)


export default router;