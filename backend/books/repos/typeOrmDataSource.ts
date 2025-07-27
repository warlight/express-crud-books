import * as dotenv from "dotenv";
import {DataSource} from "typeorm";
import BookModel from "../models/typeOrmBookModel.js";

dotenv.config();
const {DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV} = process.env;

export const BookDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [BookModel]
});

export const ConnectDB = async () => {
    await BookDataSource.initialize();
}