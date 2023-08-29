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

Font.register({ family: 'Caligraffitti', src: Caligraffitti });



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
        fontFamily: "Caligraffitti"
    }
});

export const MySingleDocument = ({ notes, category, postcode }) => (
    <Document>
        <Page style={{}} size="A5" orientation="landscape">
            <View style={{ height: "100%", width: "100%" }}>
                <Image
                    cache={false}
                    source={category}
                    src={category}
                    style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
            </View>
        </Page>
        <Page style={styles.body} size="A5" orientation="landscape">
            <View style={styles.evenFlexRow}>
                <View
                    style={{
                        ...styles.evenFlexColumn,
                        flex: 1,
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        fontFamily: "Caligraffitti"
                    }}>{notes}</Text>
                </View>
            </View>
            <Text style={{
                position: "absolute",
                bottom: "30px",
                right: "30px",
                padding: "3px",
                backgroundColor: "black",
                color: "white",
            }}>{postcode.toUpperCase()}</Text>
        </Page>
    </Document>
);

export const MyBulkDocument = ({ notes }) => {
    console.log(notes)
    return (
        <Document>
            {notes.map(({ category, note, postCode }, key) => (
                <Fragment key={key}>
                    <Page style={{}} size="A5" orientation="landscape">
                        <View style={{ height: "100%", width: "100%" }}>
                            <Image
                                cache={false}
                                source={category.image}
                                src={category.image}
                                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                            />
                        </View>
                    </Page>
                    <Page style={styles.body} size="A5" orientation="landscape">
                        <View style={styles.evenFlexRow}>
                            <View
                                style={{
                                    ...styles.evenFlexColumn,
                                    flex: 1,
                                }}
                            >
                                <Text style={{
                                    fontSize: 18,
                                    fontFamily: "Caligraffitti"
                                }}>{note}</Text>
                            </View>
                        </View>
                        <Text style={{
                            position: "absolute",
                            bottom: "30px",
                            right: "30px",
                            padding: "3px",
                            backgroundColor: "black",
                            color: "white",
                        }}>{postCode.toUpperCase()}</Text>
                    </Page>

                </Fragment>
            ))}
        </Document>
    )
}
