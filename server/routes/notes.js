import express from "express";
import {
  getNotes,
  addNotes,
  editNotes,
  getNoteStatus,
  downloadAllNotes,
} from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/status", getNoteStatus);
router.post("/add", addNotes);
router.patch("/:id", editNotes);
router.put("/downloadall", downloadAllNotes);

export default router;
