import { Router } from "express";
import register from "../functions/user/auth/register.js";
import login from "../functions/user/auth/login.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);

export { router as userRouter };
