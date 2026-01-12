import express from 'express';
import {
  getAllPost
} from '../controllers/post.controller'

const router = express.Router();

//routes
router.get('/',getAllPost)

export default router;