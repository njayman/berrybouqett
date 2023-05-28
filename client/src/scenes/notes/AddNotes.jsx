import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useAddNotesMutation } from "@state/api";

const initValues = {
  customerName: "",
  orderId: "",
  postCode: "",
  note: "",
};

const AddNotes = () => {
  const [notesData, setNotesData] = useState({ ...initValues });
  const [addNotes, { isLoading }] = useAddNotesMutation();
  const handleChange = (e) =>
    setNotesData((nd) => ({ ...nd, [e.target.id]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNotes(notesData);
    } catch (error) {}
  };
  return (
    <Stack component="form" direction="row" spacing={2} onSubmit={onSubmit}>
      <TextField
        value={notesData["customerName"]}
        id="customerName"
        name="customerName"
        label="Customer Name"
        placeholder="Customer Name"
        disabled={isLoading}
        onChange={handleChange}
      />
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
      />
      <Button type="submit" disabled={isLoading}>
        Add
      </Button>
    </Stack>
  );
};

export default AddNotes;
