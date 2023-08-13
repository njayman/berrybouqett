import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useAddNotesMutation } from "@state/api";
import { categoryMenu } from "@utils/config";

const initValues = {
  customerName: "",
  orderId: "",
  postCode: "",
  note: "",
  category:""
};

const AddNotes = () => {
  const [notesData, setNotesData] = useState({ ...initValues });
  const [addNotes, { isLoading }] = useAddNotesMutation();
  const handleChange = (e) =>
    setNotesData((nd) => ({ ...nd, [e.target.name]: e.target.value }));
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
      <FormControl style={{ width: "400px" }}>
        <InputLabel id="select-category-label">Category</InputLabel>
        <Select
          required
          labelId="select-category-label"
          id="category"
          name="category"
          placeholder="Category"
          value={notesData["category"]}
          label="Category"
          onChange={handleChange}
          disabled={isLoading}
        >
          {categoryMenu.map((cm) => (
            <MenuItem value={cm.value} key={cm.value}>{cm.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
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
        rows={1}
      />
      <Button type="submit" disabled={isLoading} sx={{ color: "white" }}>
        Add
      </Button>
    </Stack>
  );
};

export default AddNotes;
