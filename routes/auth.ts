import express from "express";
import { loginUser } from "../controllers/auth/loginUser";
import { registerUser } from "../controllers/auth/registerUser";
import { authLimiter } from "../middleware/auth/authLimiter";

const router = express.Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", loginUser);

export default router;
