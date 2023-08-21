import { Container, Grid, LinearProgress } from "@mui/material"
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { useGetCategoriesQuery } from "@state/api"
import Categories from "./Categories"
import AddCategories from "./AddCategories"
import EditCategories from "./EditCategories"
import DeleteCategories from "./DeleteCategories"

const CategoryPage = () => {
    const { data, isLoading } = useGetCategoriesQuery()
    const [sorting, setSorting] = useState([])
    const columnHelper = createColumnHelper()

    const columns = useMemo(() => {
        const clms = [
            columnHelper.accessor("label", {
                cell: (info) => info.getValue(),
                header: () => "Label"
            }),
            columnHelper.accessor("value", {
                cell: (info) => info.getValue(),
                header: () => "Value"
            }),
            columnHelper.accessor("image", {
                cell: (info) => <img src={info.getValue()} alt="" style={{
                    height: "40px",
                    weight: "40px",
                    objectFit: "contain"
                }} />,
                header: () => "Image"
            }),
            columnHelper.accessor("adminactions", {
                cell: (info) => {
                    return (
                        <>
                            <EditCategories note={info.row.original} />
                            <DeleteCategories id={info.row.original._id} />
                        </>
                    );
                },
                header: () => "Actions",
            }),
        ]
        return clms
    })

    const table = useReactTable({
        data: isLoading ? [] : data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    return <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
            <Container>
                <AddCategories />
            </Container>
        </Grid>
        <Grid item xs={12}>
            <Container>
                {isLoading ? <LinearProgress /> : <Categories table={table} />}
            </Container>
        </Grid>
    </Grid>
}

export default CategoryPage
