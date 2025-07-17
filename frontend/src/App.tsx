import {Box, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {DataGrid, type GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import type {Book} from "./bookType.ts";

function App() {
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 50, sortable: false},
        {field: 'name', headerName: 'Book name', width: 400, sortable: false},
        {field: 'author', headerName: 'Author', width: 350, sortable: false}
    ];

    // State
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [author, setAuthor] = useState('');
    const [name, setName] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    function closeForm(): any {
        setShowForm(false);
        setAuthor('');
        setName('');
        setSelectedId(null);
    }

    async function addBook()  {
        const book: Omit<Book, 'id'> = {
            author: author,
            name: name,
        }

        await fetch('http://localhost:3000/books', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        })

        closeForm();
        await getBooks();
    }

    async function getBooks() {
        const result = await fetch('http://localhost:3000/books');
        const rows = await result.json();
        setData(rows)
    }

    async function updateBookForm() {
        const result = await fetch(`http://localhost:3000/books/${selectedId}`);
        const selectedBook: Book = await result.json();
        setAuthor(selectedBook.author);
        setName(selectedBook.name);
    }

    useEffect(() => {
        const fetchBooks = async () => {
            await getBooks();
        }

        fetchBooks()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl p-8 bg-white rounded shadow">
                {!showForm ? (
                    <>
                        <Button variant="contained" onClick={() => setShowForm(!showForm)}>
                            Add book
                        </Button>
                        {
                            selectedId ? (
                                <>
                                    <Button
                                        variant="contained"
                                        onClick={() => {setShowForm(!showForm); updateBookForm()}}
                                        sx={{'marginLeft': '8px'}}
                                    >
                                        Update book
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => setShowForm(!showForm)}
                                        sx={{'marginLeft': '8px'}}
                                    >
                                        Delete book
                                    </Button></>
                            ) : (<></>)
                        }
                    </>
                    ) : (<></>)
                }

                <div className="w-full">
                    {
                        showForm ? (
                            <Box
                                display="flex"
                                component="form"
                                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                                noValidate
                                autoComplete="off">

                                <TextField
                                    id="name"
                                    size="small"
                                    label="Book name"
                                    type="text"
                                    name="name"
                                    variant="outlined"
                                    onChange={(e) => setName(e.target.value)}/>

                                <TextField
                                    id="author"
                                    size="small"
                                    label="Author"
                                    type="text"
                                    name="author"
                                    variant="outlined"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}/>

                                <Button
                                    onClick={() => addBook()}
                                    size="small"
                                    variant="contained"
                                    sx={{'marginLeft': '8px', height: '40px', alignSelf: 'center'}}>
                                    { selectedId ? ('Update book') : ('Store book') }
                                </Button>

                                <Button
                                    onClick={() => closeForm()}
                                    size="small"
                                    variant="outlined"
                                    sx={{'marginLeft': '16px', height: '40px', alignSelf: 'center'}}>
                                    Close form
                                </Button>
                            </Box>
                        ) : (
                            <DataGrid
                                rows={data}
                                columns={columns}
                                pagination
                                pageSizeOptions={[10]}
                                onRowSelectionModelChange={(newSelection) => {
                                    const firstId = Array.from(newSelection.ids)[0];
                                    setSelectedId(firstId)
                                }}
                                sx={{
                                    border: 0,
                                    width: '100%',
                                }}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default App;
