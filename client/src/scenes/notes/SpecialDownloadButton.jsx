import { Button } from "@mui/material";
import { useSetNotesDownloadedMutation } from "@state/api";
import {
  Document,
  Page,
  Text,
  PDFDownloadLink,
  StyleSheet,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import { purple } from "@mui/material/colors";
import logo from "@assets/berry-logo.png";
import box1 from "@assets/box1.jpg";
import box2 from "@assets/box2.png";
import { memo } from "react";
import anniversary from "@assets/notes/anniversary.jpg";
import birthday from "@assets/notes/birthday.jpg";
import congratulations from "@assets/notes/congratulations.jpg";
import happyholiday from "@assets/notes/happyholiday.jpg";
import getwell from "@assets/notes/getwell.jpg";
import mothersday from "@assets/notes/mothersday.jpg";
import thinking from "@assets/notes/thinking.jpg";
import valentinesday from "@assets/notes/valentinesday.jpg";
import Scriptin from "@assets/SCRIPTIN.ttf"

Font.register({ family: 'Scriptin', src: Scriptin });

const categoryImages = {
  anniversary,
  birthday,
  congratulations,
  getwell,
  happyholiday,
  mothersday,
  thinking,
  valentinesday,
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  evenFlexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  evenFlexColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  redBody: {
    width: "100%",
    padding: "20px",
    backgroundColor: "red",
    color: "white",
  },
  image: {
    height: "200px",
    width: "100%",
    objectFit: "contain",
    margin: "auto",
  },
  note: {
    fontFamily: "Scriptin"
  }
});

const MyDocument = ({ notes, category, postcode }) => (
  <Document>
    <Page style={styles.body} size="A5">
      <View style={styles.evenFlexRow}>
        <Image
          src={category}
          style={{ ...styles.image, flex: 1 }}
        />
      </View>
    </Page>
    <Page style={styles.body} size="A5">
      <View style={styles.evenFlexRow}>
        <View
          style={{
            ...styles.evenFlexColumn,
            flex: 1,
          }}
        >
          <Text style={{
            fontSize: 16,
            fontFamily: "Scriptin"
          }}>{notes}</Text>
        </View>
      </View>
      <Text style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: "3px",
        backgroundColor: "black",
        color: "white",
      }}>{postcode}</Text>
    </Page>

  </Document>
);

const SpecialDownloadButton = ({ status, note, category }) => {
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
          category={category}
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
            size="small"
            onClick={handleClick}
            disabled={isLoading}
            sx={{ color: "white", bgcolor: purple[500] }}
          >
            Special Download
          </Button>
        )
      }
    </PDFDownloadLink>
  );
};

export default memo(SpecialDownloadButton);
