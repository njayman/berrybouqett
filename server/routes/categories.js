import express from "express";
import {
    getCategories,
    addCategories,
    editCategories,
    deleteCategories,
} from "../controllers/categories.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/add", upload.single("image"), addCategories);
router.patch("/:id", upload.single("image"), editCategories);
router.delete("/:id", deleteCategories);

export default router;
