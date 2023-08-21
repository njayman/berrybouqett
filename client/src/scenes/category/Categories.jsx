import {
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded,
} from "@mui/icons-material";
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { flexRender } from "@tanstack/react-table";

const Categories = ({ table }) => {
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
                                        <Grid item>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </Grid>
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
    )
}

export default Categories
