//booksController
import {Request, Response} from 'express';
import {deleteBookById, findBookById, getAll, insertBook, updateBookById} from './booksRepository.js'
import {Book} from "./types.js"
import BookValidator from "./booksValidation.js";

const index = (req: Request, res: Response) => {
    res.json(getAll())
}

const show = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const book: Book = findBookById(id)
        res.json(book)
    } catch (error: any) {
        res.status(404).send({message: error.message})
    }
}

const store = (req: Request, res: Response) => {
    let result = BookValidator.safeParse(req.body);
    console.log(result);
    if (!result.success) {
        return res.status(422).json({
            errors: result.error.issues.map(({message, path}) =>
                ({message, field: path.join('.')}))
        })
    }

    const newBook: Book = insertBook(result.data)
    res.status(201).json(newBook)
}

const update = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    let result = BookValidator.safeParse(req.body);
    if (!result.success) {
        return res.status(422).json({
            errors: result.error.issues.map(({message, path}) =>
                ({message, field: path.join('.')}))
        })
    }

    try {
        let book: Book = updateBookById(id, req.body)
        res.json(book)
    } catch (error: any) {
        res.status(404).send({message: error.message})
    }
}

const destroy = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        deleteBookById(id)
        res.status(204).json({success: true})
    } catch (error: any) {
        res.status(404).send({message: error.message})
    }
}

export default {index, show, store, update, destroy}
