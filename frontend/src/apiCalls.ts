import type {Book} from "./bookType.ts";

export default {
    async getBooks(): Promise<Book[]> {
        const result = await fetch('http://localhost:3000/books');
        return await result.json();
    },

    async storeBook(book: Omit<Book, 'id'>): Promise<void> {
        await fetch('http://localhost:3000/books', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        })
    },

    async getBook(selectedId: number): Promise<Book> {
        const result = await fetch(`http://localhost:3000/books/${selectedId}`);
        return await result.json();
    },

    async updateBook(book: Book): Promise<void> {
        await fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        })
    },

    async deleteBook(id: number): Promise<void> {
        await fetch(`http://localhost:3000/books/${id}`, {
            method: "DELETE",
        });
    }
}