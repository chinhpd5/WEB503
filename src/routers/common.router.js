import express from 'express';
import { upload } from '../controllers/common.controller';

const router = express.Router();

router.post('/upload',upload)


export default router;