import {
  Container,
  Grid,
  LinearProgress,
  Checkbox,
  TablePagination,
} from "@mui/material";
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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const NotesPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useGetNotesQuery({
    page: pageIndex + 1,
    limit: pageSize,
  });
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
        enableSorting: false,
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
      columnHelper.accessor("note", {
        cell: (info) => info.getValue(),
        header: () => "Note",
      }),
      columnHelper.accessor("updatedAt", {
        cell: (info) => moment(info.getValue()).format("DD-MM-YYYY hh:mm:ss a"),
        header: () => "Note taking time",
      }),
      columnHelper.accessor("spdownload", {
        cell: (info) => (
          <>
            <SpecialDownloadButton
              status={info.getValue()}
              note={info.row.original}
            />
          </>
        ),
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
    data: isLoading ? [] : data.notes,
    rowCount: isLoading ? 0 : data.totalNotes,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.totalNotes || 0) / pageSize),
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
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
          {isLoading ? (
            <LinearProgress />
          ) : (
            <>
              <Notes table={table} />
              <TablePagination
                component="div"
                count={data?.totalNotes || 0}
                page={pageIndex}
                rowsPerPage={pageSize}
                onPageChange={(_event, value) => setPageIndex(value)}
                onRowsPerPageChange={(event) => {
                  setPageSize(parseInt(event.target.value, 10));
                  setPageIndex(0);
                }}
              />
            </>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default NotesPage;
