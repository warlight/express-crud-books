//routes
import {Router} from 'express'
import booksController from './booksController.js'

const router: Router = Router();

router.get('/', booksController.index);
router.get('/:id', booksController.show);
router.post('/', booksController.store);
router.put('/:id', booksController.update);
router.delete('/:id', booksController.destroy);

export default router
