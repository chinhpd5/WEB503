import express from "express"
import {register} from '../controllers/auth.controller'
import { validateRequest } from "../middlewares/validateRequest";
import { registerSchema } from "../validations/user.validation";

const router = express.Router();

router.post(`/auth/register`,validateRequest(registerSchema), register)

export default router;