import { Router } from "express";
import { login, logout, otp } from "./authController.js";

const router = Router();

router.post('/login', login)
router.get('/logout', logout)
router.post('/otp', otp)

export default router;
