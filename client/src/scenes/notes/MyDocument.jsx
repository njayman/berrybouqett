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
import Caligraffitti from "@assets/Calligraffitti-Regular.ttf"
import { Fragment } from "react";

Font.register({ family: 'Caligraffitti', src: Caligraffitti, fontWeight: "bold" });



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
        flex: 1
    },
    imageContainer: {
        height: "100%",
        width: "100%",
        padding: "30px"
    },
    image: {
        height: "100%",
        width: "100%",
        objectFit: "contain"
    },
    note: {
        fontSize: 19,
        fontFamily: "Caligraffitti"
    },
    code: {
        position: "absolute",
        bottom: "30px",
        right: "30px",
        padding: "3px",
        backgroundColor: "black",
        color: "white",
    }
});

export const MySingleDocument = ({ notes, category, postcode }) => (
    <Document>
        <Page size="A5" orientation="landscape">
            <View style={styles.imageContainer}>
                <Image
                    cache={false}
                    source={category}
                    src={category}
                    style={styles.image}
                />
            </View>
        </Page>
        <Page style={styles.body} size="A5" orientation="landscape">
            <View style={styles.evenFlexRow}>
                <View style={styles.evenFlexColumn}>
                    <Text style={styles.note}>{notes}</Text>
                </View>
            </View>
            <Text style={styles.code}>{postcode.toUpperCase()}</Text>
        </Page>
    </Document>
);

export const MyBulkDocument = ({ notes }) => {
    return (
        <Document>
            {notes.map(({ category, note, postCode }, key) => (
                <Fragment key={key}>
                    <Page size="A5" orientation="landscape">
                        <View style={styles.imageContainer}>
                            <Image
                                cache={false}
                                source={category.image}
                                src={category.image}
                                style={styles.image}
                            />
                        </View>
                    </Page>
                    <Page style={styles.body} size="A5" orientation="landscape">
                        <View style={styles.evenFlexRow}>
                            <View style={styles.evenFlexColumn}>
                                <Text style={styles.note}>{note}</Text>
                            </View>
                        </View>
                        <Text style={styles.code}>{postCode.toUpperCase()}</Text>
                    </Page>

                </Fragment>
            ))}
        </Document>
    )
}
