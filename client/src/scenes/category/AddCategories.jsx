import { useState } from "react";
import {
    Button,
    Stack,
    TextField,
} from "@mui/material";
import { useAddCategoriesMutation } from "@state/api";

const initValues = {
    label: "",
    value: "",
    image: "",
};

const AddCategories = () => {
    const [categoriesData, setCategoriesData] = useState({ ...initValues });
    const [addCategories, { isLoading }] = useAddCategoriesMutation();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setSelectedImage(e.target.files[0]);
        } else {
            setCategoriesData((nd) => ({ ...nd, [e.target.name]: e.target.value }));
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", selectedImage);
            for (const key in categoriesData) {
                formData.append(key, categoriesData[key]);
            }
            await addCategories(formData);

        } catch (error) { } finally {
            setCategoriesData(initValues)
        }
    };
    return (
        <Stack component="form" direction="row" spacing={2} onSubmit={onSubmit}>
            <TextField
                value={categoriesData["label"]}
                id="label"
                name="label"
                label="Label"
                placeholder="Label"
                disabled={isLoading}
                onChange={handleChange}
            />
            <TextField
                value={categoriesData["value"]}
                id="value"
                name="value"
                label="Value"
                placeholder="Value"
                disabled={isLoading}
                onChange={handleChange}
            />
            <TextField
                id="image"
                name="image"
                label="Image"
                type="file"
                disabled={isLoading}
                onChange={handleChange}
            />

            <Button type="submit" disabled={isLoading} sx={{ color: "white" }}>
                Add
            </Button>
        </Stack>
    );
};

export default AddCategories;
