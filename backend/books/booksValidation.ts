//bookValidator
import * as z from "zod";

const BookValidator = z.object({
    author: z.string().min(2),
    name: z.string().min(2),
})

export default BookValidator
