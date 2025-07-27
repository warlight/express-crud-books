import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {type Book} from "./bookType";
import type {Dispatch, SetStateAction} from "react";
import React from "react";

export default function BooksList({data, setSelectedId}: {
    data: Book[],
    setSelectedId: Dispatch<SetStateAction<number | null>>;
}) {
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 50, sortable: false},
        {field: 'name', headerName: 'Book name', width: 400, sortable: false},
        {field: 'author', headerName: 'Author', width: 350, sortable: false}
    ];

    return (
        <DataGrid
            rows={data}
            columns={columns}
            pagination
            pageSizeOptions={[10]}
            onRowSelectionModelChange={(newSelection) => {
                const firstId = Array.from(newSelection.ids)[0];
                if (typeof firstId === 'number') {
                    setSelectedId(firstId)
                }
            }}
            sx={{
                border: 0,
                width: '100%',
            }}
        />
    )
}