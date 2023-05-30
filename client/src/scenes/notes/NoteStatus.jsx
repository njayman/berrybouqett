import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import React, { Fragment } from "react";
import {
  useGetNoteStatusQuery,
  useSetNotesDownloadedAllMutation,
} from "@state/api";

import {
  Document,
  Page,
  Text,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  header: {
    fontSize: 18,
    margin: 12,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  notes: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  postcode: {
    margin: 12,
    fontSize: 14,
    textAlign: "right",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const MyAllDocument = ({ notes }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      {notes.map(({ note, postCode }, key) => (
        <Fragment key={key}>
          <Text style={styles.header}>Notes</Text>
          <Text style={styles.notes}>{note}</Text>
          <Text style={styles.postcode}>Post Code: {postCode}</Text>
        </Fragment>
      ))}
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const NoteStatus = ({ data: notes }) => {
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
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid item xs={6}>
            <Typography variant="h1">No. of undownloaded notes</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h2">{data?.count || 0}</Typography>
          </Grid>
          <Grid item xs={3}>
            <PDFDownloadLink
              document={
                <MyAllDocument notes={notes.filter((n) => !n.downloaded)} />
              }
              fileName={`notes.pdf`}
            >
              {({ loading, error }) => {
                if (error) {
                  return JSON.stringify(error);
                }
                return loading ? (
                  "Loading document..."
                ) : (
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "white", color: "black" }}
                    onClick={() => setNotesDownloadedAll()}
                    disabled={mutationLoading}
                  >
                    Download All
                  </Button>
                );
              }}
            </PDFDownloadLink>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default NoteStatus;
