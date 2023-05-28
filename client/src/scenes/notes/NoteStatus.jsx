import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import {
  useGetNoteStatusQuery,
  useSetNotesDownloadedAllMutation,
} from "@state/api";

const NoteStatus = () => {
  const { data, isLoading } = useGetNoteStatusQuery();
  const [setNotesDownloadedAll, { isLoading: mutationLoading }] =
    useSetNotesDownloadedAllMutation();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={6}>
        <Typography variant="h1">No. of undownloaded notes</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="h2">{data?.count || 0}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setNotesDownloadedAll()}
          disabled={mutationLoading}
        >
          Download All
        </Button>
      </Grid>
    </Grid>
  );
};

export default NoteStatus;
