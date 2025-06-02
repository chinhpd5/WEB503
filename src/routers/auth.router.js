import express from "express"
import {login, register} from '../controllers/auth.controller'
import { validateRequest } from "../middlewares/validateRequest";
import { registerSchema,loginSchema } from "../validations/user.validation";

const router = express.Router();

router.post(`/auth/register`,validateRequest(registerSchema), register)
router.post('/auth/login', validateRequest(loginSchema),login)

export default router;