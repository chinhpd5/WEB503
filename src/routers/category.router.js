import express from 'express';
import { addCategory, getAllCaterory } from '../controllers/category.controller';

const router = express.Router();

router.get('/',getAllCaterory);
router.post('/',addCategory);

export default router;