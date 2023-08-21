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
import { useEditNotesMutation } from "@state/api";
import { Edit } from "@mui/icons-material";
import { useGetCategoriesQuery } from "@state/api";

const EditNotes = ({ note }) => {
  const [open, setOpen] = useState(false);
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery()
  const [editNotes, { isLoading }] = useEditNotesMutation();
  const [notesData, setNotesData] = useState({ ...note });
  const handleChange = (e) =>
    setNotesData((nd) => ({ ...nd, [e.target.name]: e.target.value }));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await editNotes({
        params: {
          id: note._id,
        },
        body: notesData,
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
        <Edit />
      </IconButton>
      {open && (
        <Dialog onClose={handleClose} open={open}>
          <Box component="form" onSubmit={onSubmit}>
            <DialogTitle>Edit Notes</DialogTitle>
            <DialogContent>
              <Stack direction="column" spacing={2}>
                <TextField
                  value={notesData["customerName"]}
                  id="customerName"
                  name="customerName"
                  label="Customer Name"
                  placeholder="Customer Name"
                  disabled={isLoading}
                  onChange={handleChange}
                />
                <FormControl style={{ width: "400px" }}>
                  <InputLabel id="select-category-label">Category</InputLabel>
                  <Select
                    labelId="select-category-label"
                    id="category"
                    name="category"
                    placeholder="Category"
                    value={notesData["category"]}
                    label="Category"
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    {categories.map((cm) => (
                      <MenuItem value={cm.value} key={cm.value}>
                        {cm.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  value={notesData["orderId"]}
                  id="orderId"
                  name="orderId"
                  label="Order Id"
                  placeholder="Order Id"
                  disabled={isLoading}
                  onChange={handleChange}
                />
                <TextField
                  value={notesData["postCode"]}
                  id="postCode"
                  name="postCode"
                  label="Post Code"
                  placeholder="Post Code"
                  disabled={isLoading}
                  onChange={handleChange}
                  required
                />
                <TextField
                  value={notesData["note"]}
                  id="note"
                  name="note"
                  label="Note"
                  placeholder="Note"
                  disabled={isLoading}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                />
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

export default EditNotes;
