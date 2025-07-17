// index.ts
import express from 'express'
import cors from 'cors'
import routes from './books/routes.js'

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use('/books', routes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
