import Note from "../models/Note.js";

export const getNotes = async (_, res) => {
    try {
        const notes = await Note.aggregate([
            {
                $project: {
                    sl: { $toInt: "$slNo" },
                    customerName: 1,
                    orderId: 1,
                    postCode: 1,
                    note: 1,
                    category: 1,
                    downloaded: 1,
                    createdAt: 1,
                    updatedAt: 1, // Convert slNo to number and rename as sl
                },
            },
            {
                $sort: {
                    createdAt: -1, // Sort by createdAt field in descending order
                },
            },
        ]);

        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getNoteStatus = async (req, res) => {
    try {
        const count = await Note.countDocuments({ downloaded: false });
        res.status(200).json({ count });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addNotes = async (req, res) => {
    try {
        console.log(req.body)
        const note = new Note(req.body);
        await note.save();

        res.status(200).json({ message: "Added notes" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const editNotes = async (req, res) => {
    try {
        console.log(req.body);
        await Note.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json({ message: "Updated notes download status" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteNotes = async (req, res) => {
    try {
        console.log(req.body);
        await Note.deleteOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json({ message: "Note deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const downloadAllNotes = async (req, res) => {
    try {
        console.log(req.body);
        await Note.updateMany({ downloaded: false }, { downloaded: true });
        res.status(200).json({ message: "Updated all notes download status" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
