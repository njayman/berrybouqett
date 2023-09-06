import NoteConfig from "../models/NoteConfig.js";

export const getNoteConfig = async (_, res) => {
    try {
        const noteconfigs = await NoteConfig.aggregate([
            {
                $group: {
                    _id: null,
                    config: {
                        $push: {
                            k: '$key',
                            v: '$value',
                        },
                    },
                },

            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: '$config',
                    },
                },
            },
        ]);
        if (noteconfigs.length > 0) {
            res.status(200).json(noteconfigs[0]);
        } else {
            res.status(200).json({});
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getSingleNoteConfig = async (req, res) => {
    try {
        const noteconfig = await NoteConfig.findOne({ key: req.params.key });

        res.status(200).json(noteconfig);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addNoteConfig = async (req, res) => {
    try {
        const { key, value } = req.body;
        await NoteConfig.findOneAndUpdate({ key: req.params.key }, {
            $set: {
                key,
                value,
            }
        }, {
            upsert: true,
            new: true
        });
        res.status(200).json({ message: "Updated note config" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const editNoteConfig = async (req, res) => {
    try {
        const newConfigData = req.body;
        const promises = Object.keys(newConfigData).map(async (key) => {
            await NoteConfig.findOneAndUpdate(
                { key: key },
                { value: newConfigData[key] },
                { upsert: true }
            );
        });

        await Promise.all(promises);

        res.status(200).json({ message: "Updated note config" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteNoteConfig = async (req, res) => {
    try {
        await NoteConfig.deleteOne({ key: req.params.key });
        res.status(200).json({ message: "Note config deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
