import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: false,
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
