import express from "express";
import { PORT, DB_URL } from "./config.js";
import mongoose from "mongoose";
import routers from "./Routers/todoRouter.js";
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', routers)

mongoose.connect(DB_URL).then(()=>{
    console.log("DB connnected success")
    app.listen(PORT, ()=>{
        console.log("Server running on port", PORT)
    })
}).catch((err) => {
    console.log(err)
})

