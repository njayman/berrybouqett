import { Button } from "@mui/material";
import { useSetNotesDownloadedMutation, useGetNoteConfigQuery } from "@state/api";
import { pdf } from "@react-pdf/renderer";
import { memo } from "react";
import { MySingleDocument } from "./MyDocument";

const SpecialDownloadButton = ({ note }) => {
    const { isLoading: configLoading, data: noteconfig } = useGetNoteConfigQuery()
    const [setNotesDownloaded, { isLoading }] = useSetNotesDownloadedMutation();
    const handleClick = async () => {
        try {
            const noteBlob = await pdf(
                <MySingleDocument
                    fontSize={noteconfig.fontSize}
                    notes={note.note}
                    postcode={note.postCode}
                    customerName={note.customerName}
                    category={note.category.image}
                />
            ).toBlob()
            const url = URL.createObjectURL(noteBlob);
            window.open(url, "_blank");
            setNotesDownloaded({
                params: { id: note._id },
                body: {
                    downloaded: true,
                },
            });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Button
            variant="contained"
            size="small"
            onClick={handleClick}
            disabled={isLoading && configLoading}
            color={note.downloaded ? "success" : "notdownloaded"}
        >
            Special Download
        </Button>
    );
};

export default memo(SpecialDownloadButton);
