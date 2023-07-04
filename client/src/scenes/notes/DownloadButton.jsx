import { Button } from "@mui/material";
import { useSetNotesDownloadedMutation } from "@state/api";
import {
  Document,
  Page,
  Text,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import { memo } from "react";

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

const MyDocument = ({ notes, postcode, customerName }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.header}>Name: {customerName}</Text>
      <Text style={styles.header}>Notes</Text>
      <Text style={styles.notes}>{notes}</Text>
      <Text style={styles.postcode}>Post Code: {postcode}</Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

const DownloadButton = ({ status, note }) => {
  const [setNotesDownloaded, { isLoading }] = useSetNotesDownloadedMutation();
  const handleClick = () => {
    setNotesDownloaded({
      params: { id: note._id },
      body: {
        downloaded: true,
      },
    });
  };
  return (
    <PDFDownloadLink
      document={
        <MyDocument
          notes={note.note}
          postcode={note.postCode}
          customerName={note.customerName}
        />
      }
      fileName={`notes-${note._id}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          "Loading document..."
        ) : (
          <Button
            variant="contained"
            color={status ? "success" : "notdownloaded"}
            size="small"
            onClick={handleClick}
            disabled={isLoading}
            sx={{ color: "white" }}
          >
            {status ? "Downloaded" : "Not downloaded"}
          </Button>
        )
      }
    </PDFDownloadLink>
  );
};

export default memo(DownloadButton);
