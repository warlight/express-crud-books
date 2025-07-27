import Button from "@mui/material/Button";
import React, {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {Book} from "./bookType.ts";
import apiCalls from "./apiCalls";
import {Box, TextField} from "@mui/material";

export default function BookForm({selectedId, showForm, setSelectedId, setShowForm}: {
    selectedId: number | null;
    showForm: boolean;
    setSelectedId: Dispatch<SetStateAction<number | null>>;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}) {
    const [author, setAuthor] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const showBookForm = async () => {
            if (selectedId && showForm) {
                const selectedBook: Book = await apiCalls.getBook(selectedId)
                setAuthor(selectedBook.author);
                setName(selectedBook.name);
            }
        }
        showBookForm();
    }, [selectedId, showForm]);

    async function addBook() {
        if (selectedId) {
            const book: Book = {
                id: selectedId,
                name: name,
                author: author,
            }
            await apiCalls.updateBook(book);
        } else {
            const book: Omit<Book, 'id'> = {
                author: author,
                name: name,
            }
            await apiCalls.storeBook(book);
        }

        closeForm();
    }

    function closeForm(): any {
        setShowForm(false);
        setAuthor('');
        setName('');
        setSelectedId(null);
    }

    return (
        <>
            <Box
                display="flex"
                component="form"
                sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
                noValidate
                autoComplete="off">

                <TextField
                    id="name"
                    size="small"
                    label="Book name"
                    type="text"
                    name="name"
                    variant="outlined"
                    value={name}
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
                    {selectedId ? ('Update book') : ('Store book')}
                </Button>

                <Button
                    onClick={() => closeForm()}
                    size="small"
                    variant="outlined"
                    sx={{'marginLeft': '16px', height: '40px', alignSelf: 'center'}}>
                    Close form
                </Button>
            </Box>
        </>
    )
}