import mongoose from 'mongoose';

const MongooseBookSchema = new mongoose.Schema({
    id: Number,
    author: String,
    name: String,
})

export default mongoose.model("Book", MongooseBookSchema);
