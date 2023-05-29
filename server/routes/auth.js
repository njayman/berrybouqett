import { Router } from "express";
import { login, logout, refresh, signup } from "../controllers/auth.js";

const router = Router();

// signup
router.post("/signup/:role", signup);

// login
router.post("/login/:role", login);

// get new access token
router.post("/refresh", refresh);

// logout
router.delete("/logout", logout);

export default router;
