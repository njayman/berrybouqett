import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import DownloadButton from "./DownloadButton";

const Notes = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();
  const user = useAuthUser()();

  const columns = useMemo(() => {
    const clms = [
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
      columnHelper.accessor("postCode", {
        cell: (info) => info.getValue(),
        header: () => "Post Code",
      }),
      columnHelper.accessor("note", {
        cell: (info) => info.getValue(),
        header: () => "Note",
      }),
      columnHelper.accessor("updatedAt", {
        cell: (info) => info.getValue(),
        header: () => "Note taking time",
      }),
    ];
    if (user?.role === "user") {
      clms.push(
        columnHelper.accessor("downloaded", {
          cell: (info) => {
            return (
              <DownloadButton
                status={info.getValue()}
                id={info.row.original._id}
              />
            );
          },
          header: () => "Single Download",
        })
      );
    }
    return clms;
  }, []);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  sx={{
                    color: "secondary.main",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    wrap="nowrap"
                  >
                    <Grid item>{header.column.columnDef.header()}</Grid>
                    <Grid item>
                      {{
                        asc: <KeyboardArrowUpRounded />,
                        desc: <KeyboardArrowDownRounded />,
                      }[header.column.getIsSorted()] ?? null}
                    </Grid>
                  </Grid>
                  {/* <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: <ArrowUpward />,
                      desc: <ArrowDownward />,
                    }[header.column.getIsSorted()] ?? null}
                  </div> */}
                </TableCell>
              ))}
              {user?.role === "user" && <TableCell>Special Download</TableCell>}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} component="th" scope="row">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
              {user?.role === "user" && (
                <TableCell>
                  <Button>Special Download</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
};

export default Notes;
