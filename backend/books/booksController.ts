//booksController
import {Request, Response} from 'express';
import {deleteBookById, findBookById, getAll, insertBook, updateBookById} from "./repos/booksTypeOrmRepository.js";
import {Book} from "./types.js"
import BookValidator from "./booksValidation.js";

const index = async (req: Request, res: Response): Promise<void> => {
    res.json(await getAll());
}

const show = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    try {
        res.json(await findBookById(id))
    } catch (error: any) {
        res.status(404).send({message: error.message})
    }
}

const store = async (req: Request, res: Response): Promise<void> => {
    let result = BookValidator.safeParse(req.body);
    if (!result.success) {
        res.status(422).json({
            errors: result.error.issues.map(({message, path}) =>
                ({message, field: path.join('.')}))
        })
    } else {
        const newBook: Book = await insertBook(result.data)
        res.status(201).json(newBook)
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);

    let result = BookValidator.safeParse(req.body);
    if (!result.success) {
        res.status(422).json({
            errors: result.error.issues.map(({message, path}) =>
                ({message, field: path.join('.')}))
        })
    } else {
        try {
            let book: Book = await updateBookById(id, req.body)
            res.json(book)
        } catch (error: any) {
            res.status(404).send({message: error.message})
        }
    }
}

const destroy = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        await deleteBookById(id)
        res.status(204).json({success: true})
    } catch (error: any) {
        res.status(404).send({message: error.message})
    }
}

export default {index, show, store, update, destroy}
