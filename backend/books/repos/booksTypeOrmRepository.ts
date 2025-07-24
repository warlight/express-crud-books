import {Book} from "../types.js";
import BookModel from "../models/typeOrmBookModel.js";

export const getAll = async (): Promise<Book[]> => {
    return await BookModel.find();
}

export const findBookById = async (id: number): Promise<Book> => {
    return await BookModel.findOneBy({id});
}

export const insertBook = async (data: Omit<Book, 'id'>): Promise<Book> => {
    const newBook = new BookModel();
    newBook.author = data.author;
    newBook.name = data.name;
    return await newBook.save();
}

export const updateBookById = async (id: number, data: Partial<Book>): Promise<Book> => {
    const currentBook = await BookModel.findOneBy({id});
    if (data.author)
    {
        currentBook.author = data.author;
    }
    if (data.name) {
        currentBook.name = data.name;
    }
    currentBook.save();
    return currentBook;
}

export const deleteBookById = async (id: number): Promise<void> => {
    const book = await BookModel.findOneBy({id})
    await book.remove();
}
