//booksRepository
import {type Book } from "../types.js"

let books: Book[] = []
let nextId: number = 1

export const getAll = (): Book[] => books

export const findBookById = (id: number): Book => {
    let book: Book|undefined = books.find(item => item.id === id)
    if (book) {
        return book
    }
    throw new Error("not found!")
}

export const insertBook = (data: Omit<Book, 'id'>): Book => {
    const newBook: Book = {...data, id: nextId++}
    books.push(newBook)
    return newBook
}

export const updateBookById = (id: number, data: Partial<Book>): Book => {
    const foundBook: number = books.findIndex(book => book.id === id)
    if (foundBook !== -1) {
        books[foundBook] = { ...books[foundBook], ...data }
        return books[foundBook]
    }

    throw new Error('not found!')
}

export const deleteBookById = (id: number) => {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books.splice(i, 1)
            return
        }
    }

    throw new Error('not found!')
}
