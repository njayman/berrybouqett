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
  Stack,
  TextField,
} from "@mui/material";
import { useDeleteNotesMutation } from "@state/api";
import { Delete } from "@mui/icons-material";

const DeleteNotes = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [deleteNotes, { isLoading }] = useDeleteNotesMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteNotes({
        params: {
          id,
        },
      });
      console.log(data);
      if (data) {
        handleClose();
      }
    } catch (error) {}
  };
  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Delete />
      </IconButton>
      {open && (
        <Dialog onClose={handleClose} open={open}>
          <Box component="form" onSubmit={onSubmit}>
            <DialogTitle>Delete Notes</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to delete this note?
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

export default DeleteNotes;
