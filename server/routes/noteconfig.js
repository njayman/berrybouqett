import express from "express";
import { addNoteConfig, deleteNoteConfig, editNoteConfig, getNoteConfig, getSingleNoteConfig } from "../controllers/noteconfig.js";


const router = express.Router();

router.get("/", getNoteConfig);
router.get("/:key", getSingleNoteConfig);
router.post("/:key", addNoteConfig);
router.patch("/", editNoteConfig);
router.delete("/:key", deleteNoteConfig);

export default router;