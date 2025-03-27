import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useDeleteAllNotesMutation } from "@state/api";

const DeleteAllNotes = () => {
  const [open, setOpen] = useState(false);
  const [deleteAllNotes, { isLoading }] = useDeleteAllNotesMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteAllNotes();

      if (data) {
        handleClose();
      }
    } catch (error) {}
  };
  return (
    <Stack
      component="form"
      direction="row"
      justifyContent="end"
      onSubmit={onSubmit}
      sx={{ pb: 2 }}
    >
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        Delete all Notes
      </Button>
      {open && (
        <Dialog onClose={handleClose} open={open}>
          <Box component="form" onSubmit={onSubmit}>
            <DialogTitle>Delete Notes</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to delete all notes?
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
    </Stack>
  );
};

export default DeleteAllNotes;
