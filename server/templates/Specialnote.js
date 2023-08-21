import ReactPDF, {
    Document,
    Page,
    Text,
    StyleSheet,
    View,
    Image,
    Font,
} from "@react-pdf/renderer";
import Scriptin from "./SCRIPTIN.ttf"

Font.register({ family: 'Scriptin', src: Scriptin });

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

const PDF = ({ notes, category, postcode }) => {
    return (
        <Document>
            <Page style={styles.body} size="A5">
                <View style={styles.evenFlexRow}>
                    <Image
                        cache={false}
                        source={category}
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
};

export default async (data) => {
    return await ReactPDF.renderToStream(<PDF {...{ data }} />);
};