import { Button, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";
import {
    useGetNoteStatusQuery,
    useSetNotesDownloadedAllMutation,
} from "@state/api";
import { MyBulkDocument } from "./MyDocument"

import { pdf } from "@react-pdf/renderer";
import { useSetNotesDownloadedBulkMutation } from "@state/api";

const myAllDocument = async ({ notes }) => {
    try {
        const noteBlob = await pdf(<MyBulkDocument notes={notes} />).toBlob()
        const url = URL.createObjectURL(noteBlob);
        window.open(url, "_blank");
    } catch (error) {
        console.log(error)
    }
};

const NoteStatus = ({ data: notes, selectedNotes }) => {
    const { data, isLoading } = useGetNoteStatusQuery();
    const [setNotesDownloadedAll, { isLoading: mutationLoading }] =
        useSetNotesDownloadedAllMutation();
    const [setNotesDownloadedBulk, { isLoading: bulkDownloadLoading }] = useSetNotesDownloadedBulkMutation();

    const handleDownloadSelectedNoted = () => {
        const selNotes = selectedNotes.map((sl) => sl.original)
        myAllDocument({
            notes: selNotes,
        });
        const selNotesIds = selNotes.map(sn => sn._id)
        setNotesDownloadedBulk({
            body: {
                notes: selNotesIds
            }
        })
    }

    const handleDownloadAll = () => {
        const allNotes = notes.filter((n) => !n.downloaded)
        if (allNotes.length === 0) {
            alert("No notes to download")
            return
        }
        myAllDocument({ notes: allNotes });
        setNotesDownloadedAll();
    }

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
                        <Stack direction="row" gap={2}>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: "white",
                                    color: "black",
                                    "&:hover": {
                                        bgcolor: "grey.200",
                                        color: "black",
                                    },
                                }}
                                onClick={handleDownloadAll}
                                disabled={mutationLoading}
                            >
                                Download All
                            </Button>
                            <Button
                                sx={{
                                    bgcolor: selectedNotes.length === 0 ? "grey" : "white",
                                    color: "black",
                                    "&:hover": {
                                        bgcolor: "grey.200",
                                        color: "black",
                                    },
                                }}
                                disabled={bulkDownloadLoading || selectedNotes.length === 0}
                                onClick={handleDownloadSelectedNoted}
                            >
                                Download selected
                            </Button>
                        </Stack>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default NoteStatus;
