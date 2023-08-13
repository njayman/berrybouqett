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
});

const MyDocument = ({ notes, category }) => (
  <Document>
    <Page style={styles.body}>
      <View style={styles.evenFlexRow}>
        <Image
          src={categoryImages[category]}
          style={{ ...styles.image, flex: 1 }}
        />
      </View>
    </Page>
    <Page style={styles.body}>
      <View style={styles.evenFlexRow}>
        <Image src={box1} style={{ ...styles.image, flex: 1 }} />
        <View
          style={{
            ...styles.evenFlexColumn,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: "10px",
            }}
          >
            Leaving a Lasting Impression With Our
            <br />
            Freshest Ideas in Gifts For All Occasions.
            <br />
            Our fruit bouquets are always made to
            <br />
            order using the best Premium Fruit
            <br />
            available & Real Gourmet Chocolate.
            <br />
          </Text>
          <Text>{notes}</Text>
        </View>
      </View>
      <View style={styles.redBody}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          We deliver nationwide the next day
        </Text>
      </View>
      <View style={styles.evenFlexRow}>
        <View
          style={{
            display: "flex",
            ...styles.evenFlexColumn,

            flex: 1,
          }}
        >
          <View
            style={{
              textAlign: "right",
              padding: "15px",
            }}
          >
            <Image src={logo} style={{ ...styles.image, height: "80px" }} />
            <Text
              style={{
                fontWeight: "lighter",
                fontSize: "30px",
              }}
            >
              The best things
            </Text>
            <Text
              style={{
                fontWeight: "bolder",
                fontSize: "40px",
                color: "red",
              }}
            >
              in life
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "37px",
              }}
            >
              are delicious
            </Text>

            <Text
              style={{
                fontWeight: "bolder",
                fontSize: "17px",
                color: "red",
              }}
            >
              Visit us at:
            </Text>
            <Text
              style={{
                fontWeight: "bolder",
                fontSize: "17px",
              }}
            >
              www.berrybouquets.co.uk
            </Text>
            <Text
              style={{
                fontWeight: "bolder",
                fontSize: "17px",
                color: "red",
              }}
            >
              Call us on:
            </Text>
            <Text
              style={{
                fontWeight: "bolder",
                fontSize: "17px",
              }}
            >
              0333 015 0202
            </Text>
          </View>
        </View>
        <Image src={box2} style={{ ...styles.image, flex: 1 }} />
      </View>
    </Page>
  </Document>
);

const SpecialDownloadButton = ({ status, note }) => {
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
          category={note.category}
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
