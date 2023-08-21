import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDeleteCategoriesMutation } from "@state/api";

const DeleteCategories = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [deleteCategories, { isLoading }] = useDeleteCategoriesMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteCategories({
        params: {
          id,
        },
      });
      console.log(data);
      if (data) {
        handleClose();
      }
    } catch (error) { }
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      {open && (
        <Dialog onClose={handleClose} open={open}>
          <Box component="form" onSubmit={onSubmit}>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to delete this category?
              </DialogContentText>
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
                Delete
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
    </>
  );
};

export default DeleteCategories;
