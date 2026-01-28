import express from "express";
import {login, register} from "../controllers/auth.controller"
import { validateRequest } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validations/auth.valid";

const router = express.Router();

router.post('/register',validateRequest(registerSchema),register)
router.post('/login',validateRequest(loginSchema),login)

export default router;
