import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    work: {
        type: String,
        required: true
    }
})

const todoModel = mongoose.model('todoModel', todoSchema)

export default todoModel