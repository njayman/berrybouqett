import { Router } from "express";
import { login, logout, refresh, signup } from "../controllers/auth.js";

const router = Router();

// signup
router.post("/signUp", signup);

// login
router.post("/logIn", login);

// get new access token
router.post("/refresh", refresh);

// logout
router.delete("/logout", logout);

export default router;
