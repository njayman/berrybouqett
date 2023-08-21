import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useEditCategoriesMutation } from "@state/api";

const EditCategories = ({ note: category }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editCategories, { isLoading }] = useEditCategoriesMutation();
  const [categoriesData, setCategoriesData] = useState({ ...category });
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setSelectedImage(e.target.files[0]);
    } else {
      setCategoriesData((nd) => ({ ...nd, [e.target.name]: e.target.value }));
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      for (const key in categoriesData) {
        formData.append(key, categoriesData[key]);
      }
      const { data } = await editCategories({
        params: {
          id: category._id,
        },
        body: formData,
      });
      // console.log(data);
      if (data) {
        handleClose();
      }
    } catch (error) { }
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      {open && (
        <Dialog onClose={handleClose} open={open}>
          <Box component="form" onSubmit={onSubmit}>
            <DialogTitle>Edit Notes</DialogTitle>
            <DialogContent>
              <Stack direction="column" spacing={2}>
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
                <Button
                  type="button"
                  variant="contained"
                  startIcon={<img src={selectedImage ? selectedImage : categoriesData["image"]} alt="" style={{
                    height: "40px",
                    width: "40px",
                    objectFit: "contsin"
                  }} />}
                  component="label"
                >
                  Upload
                  <input
                    id="image"
                    name="image"
                    label="Image"
                    type="file"
                    disabled={isLoading}
                    onChange={handleChange}
                    hidden
                  />
                </Button>

              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                type="button"
                disabled={isLoading}
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                Edit
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default EditCategories;
