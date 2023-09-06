import mongoose from "mongoose";

const NoteConfigSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true
        },
        value: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const NoteConfig = mongoose.model("NoteConfig", NoteConfigSchema);
export default NoteConfig;