// index.ts
import "reflect-metadata";
import express from 'express'
import cors from 'cors'
import routes from './books/routes.js'
import { ConnectDB } from "./books/repos/typeOrmDataSource.js";

// import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/books', routes);
await ConnectDB();
// await mongoose.connect('mongodb://127.0.0.1:27017/crud_books');

// BookSchema.find(1);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
