import Button from '@mui/material/Button';
import React, {useEffect, useState} from "react";
import type {Book} from "./bookType.ts";
import apiCalls from "./apiCalls";
import BookForm from "./BookForm";
import BooksList from "./BooksList";

function App() {
    // State
    const [data, setData] = useState<Book[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    async function getBooks() {
        const rows: Book[] = await apiCalls.getBooks();
        setData(rows)
    }

    async function updateBookForm() {
        if (selectedId === null) return;
        setSelectedId(selectedId);
    }

    async function deleteBook() {
        if (selectedId === null) return;

        await apiCalls.deleteBook(selectedId);
        setSelectedId(null);
        await getBooks();
    }

    useEffect(() => {
        const fetchBooks = async () => {
            await getBooks();
        }
        fetchBooks();
    }, [])

    useEffect(() => {
        if (!showForm) {
            getBooks();
        }
    }, [showForm]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl p-8 bg-white rounded shadow">
                {!showForm ?
                    <>
                        <Button variant="contained" onClick={() => setShowForm(!showForm)}>
                            Add book
                        </Button>
                        {
                            selectedId ? (
                                <>
                                    <Button
                                        variant="contained"
                                        onClick={async () => {
                                            setShowForm(!showForm); await updateBookForm()
                                        }}
                                        sx={{'marginLeft': '8px'}}
                                    >
                                        Update book
                                    </Button>

                                    <Button
                                        variant="contained"
                                        sx={{'marginLeft': '8px'}}
                                        onClick={deleteBook}
                                    >
                                        Delete book
                                    </Button>
                                </>
                            ) : (<></>)
                        }
                    </>
                    : <></>
                }

                <div className="w-full">
                    {
                        showForm
                            ?
                            <BookForm
                                selectedId={selectedId}
                                showForm={showForm}
                                setSelectedId={setSelectedId}
                                setShowForm={setShowForm}/>
                            :
                            <BooksList data={data} setSelectedId={setSelectedId}></BooksList>
                    }
                </div>
            </div>
        </div>
    )
}

export default App;
