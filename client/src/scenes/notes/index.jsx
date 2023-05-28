import { Container, Grid, LinearProgress } from "@mui/material";
import AddNotes from "./AddNotes";
import { useGetNotesQuery } from "@state/api";
import Notes from "./Notes";
import { useAuthUser } from "react-auth-kit";
import NoteStatus from "./NoteStatus";

const NotesPage = () => {
  const { data, isLoading } = useGetNotesQuery();
  const user = useAuthUser()();

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12}>
        <Container>
          {user.role === "admin" ? <AddNotes /> : <NoteStatus />}
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container>
          {isLoading ? <LinearProgress /> : <Notes data={data} />}
        </Container>
      </Grid>
    </Grid>
  );
};

export default NotesPage;
