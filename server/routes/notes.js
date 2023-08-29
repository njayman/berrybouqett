import express from "express";
import {
    getNotes,
    addNotes,
    editNotes,
    deleteNotes,
    getNoteStatus,
    downloadBulkNotes,
    downloadAllNotes,
} from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);
router.get("/status", getNoteStatus);
router.post("/add", addNotes);
router.patch("/:id", editNotes);
router.delete("/:id", deleteNotes);
router.put("/downloadbulk", downloadBulkNotes);
router.put("/downloadall", downloadAllNotes);

export default router;
