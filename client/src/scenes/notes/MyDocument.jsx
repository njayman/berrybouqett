import {
    Document,
    Page,
    Text,
    StyleSheet,
    View,
    Image,
    Font,
} from "@react-pdf/renderer";
import Calligraffitti from "@assets/Calligraffitti.ttf"
import { Fragment, useEffect } from "react";

Font.register({ family: 'Calligraffitti', src: Calligraffitti, fontWeight: "bold" });



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
        fontFamily: "Calligraffitti"
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

export const MySingleDocument = ({ notes, category, postcode, fontSize }) => (
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
                    <Text style={{ ...styles.note, fontSize }}>{notes}</Text>
                </View>
            </View>
            <Text style={styles.code}>{postcode.toUpperCase()}</Text>
        </Page>
    </Document>
)

export const MyBulkDocument = ({ notes, fontSize }) => (
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
                            <Text style={{ ...styles.note, fontSize }}>{note}</Text>
                        </View>
                    </View>
                    <Text style={styles.code}>{postCode.toUpperCase()}</Text>
                </Page>

            </Fragment>
        ))}
    </Document>
)

