import { Container, Grid, LinearProgress, Checkbox } from "@mui/material";
import AddNotes from "./AddNotes";
import { useGetNotesQuery } from "@state/api";
import Notes from "./Notes";
import { useAuthUser } from "react-auth-kit";
import NoteStatus from "./NoteStatus";
import { useMemo, useState } from "react";
import moment from "moment";
import EditNotes from "./EditNotes";
import DeleteNotes from "./DeleteNotes";
import SpecialDownloadButton from "./SpecialDownloadButton";
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

const NotesPage = () => {
    const { data, isLoading } = useGetNotesQuery();
    const [sorting, setSorting] = useState([]);
    const user = useAuthUser()();
    const [rowSelection, setRowSelection] = useState({});
    const columnHelper = createColumnHelper();

    const columns = useMemo(() => {
        const clms = [
            columnHelper.accessor("select", {
                header: ({ table }) => (
                    <Checkbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <Checkbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
                enableSorting: false
            }),
            columnHelper.accessor("sl", {
                cell: (info) => info.getValue(),
                header: () => "Sl no.",
            }),
            columnHelper.accessor("customerName", {
                cell: (info) => info.getValue(),
                header: () => "Customer Name",
            }),
            columnHelper.accessor("orderId", {
                cell: (info) => info.getValue(),
                header: () => "Order Id",
            }),
            columnHelper.accessor("category", {
                cell: (info) => info.getValue().label,
                header: () => "Category",
            }),
            columnHelper.accessor("postCode", {
                cell: (info) => info.getValue(),
                header: () => "Post Code",
            }),
            columnHelper.accessor("fontSize", {
                cell: (info) => info.getValue(),
                header: () => "Font Size",
            }),
            columnHelper.accessor("note", {
                cell: (info) => info.getValue(),
                header: () => "Note",
            }),
            columnHelper.accessor("updatedAt", {
                cell: (info) => moment(info.getValue()).format("DD-MM-YYYY hh:mm:ss a"),
                header: () => "Note taking time",
            }),
            columnHelper.accessor("spdownload", {
                cell: (info) =>
                    <>
                        <SpecialDownloadButton
                            status={info.getValue()}
                            note={info.row.original}
                        />
                    </>
                ,
                header: () => "Special Download",
            }),
            columnHelper.accessor("adminactions", {
                cell: (info) => {
                    return (
                        <>
                            <EditNotes note={info.row.original} />
                            <DeleteNotes id={info.row.original._id} />
                        </>
                    );
                },
                header: () => "Actions",
            }),
        ];
        return clms;
    }, []);

    const table = useReactTable({
        initialState: {
            columnVisibility: {
                spdownload: user?.role === "user",
                adminactions: user?.role === "admin",
            },
        },
        data: isLoading ? [] : data,
        columns,
        state: {
            sorting,
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
                <Container>
                    {user.role === "admin" ? (
                        <AddNotes />
                    ) : (
                        <>
                            {isLoading ? (
                                <LinearProgress />
                            ) : (
                                <NoteStatus
                                    data={data}
                                    selectedNotes={table.getSelectedRowModel().flatRows}
                                />
                            )}
                        </>
                    )}
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Container>
                    {isLoading ? <LinearProgress /> : <Notes table={table} />}
                </Container>
            </Grid>
        </Grid>
    );
};

export default NotesPage;
