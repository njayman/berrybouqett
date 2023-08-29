import { Button } from "@mui/material";
import { useSetNotesDownloadedMutation } from "@state/api";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { purple } from "@mui/material/colors";
import { memo } from "react";
import { MySingleDocument } from "./MyDocument";

const SpecialDownloadButton = ({ note }) => {
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
                <MySingleDocument
                    notes={note.note}
                    postcode={note.postCode}
                    customerName={note.customerName}
                    category={note.category.image}
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
