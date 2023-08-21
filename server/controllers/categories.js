import Category from "../models/Category.js";

export const getCategories = async (_, res) => {
    try {
        const categories = await Category.aggregate([
            {
                $project: {
                    label: 1,
                    value: 1,
                    image: 1,
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

        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addCategories = async (req, res) => {
    try {
        const { label, value } = req.body;
        const imageUrl = req.file ? `//${req.get("host")}/${req.file.path}` : "";
        const category = new Category({
            label: label,
            value: value,
            image: imageUrl
        });

        await category.save();
        res.status(200).json({ message: "Added category" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const editCategories = async (req, res) => {
    try {
        const { label, value } = req.body;
        const imageUrl = req.file ? `${req.protocol}://${req.get("host")}/${req.file.path}` : "";
        await Category.updateOne({ _id: req.params.id }, {
            $set: {
                label,
                value,
                image: imageUrl
            }
        });
        res.status(200).json({ message: "Updated Category" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteCategories = async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
