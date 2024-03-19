import express from 'express'
import todoModel from '../models/todo.js'

const routers = express.Router()

routers.route('/work')
.get(async(req, res) => {
    try{
        const todoData = await todoModel.find({})
        return res.status(200).json(todoData)
    }catch(err){
        console.log(err)
        return res.status(404).send("Something went wrong")
    }
})
.post(async(req, res) => {
    try{
        const data = {
            work: req.body.work
        }
        const todoData = await todoModel.create(data)
        return res.status(200).send(todoData)
    }catch(err){
        console.log(err)
        return res.status(404).send("Something went wrong")
    }
})

routers.route('/work/:id')
.get(async(req, res) => {
    try{
    const {id} = req.params
    const data = await todoModel.findB(id)
    res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(400).send("Something went wrong")
    }
})
.put(async(req, res) => {
    try{
    const {id} = req.params
    const update = {
        work : req.body.work
    }
    const data = await todoModel.findByIdAndUpdate(id, update)
    res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(400).send("Something went wrong")
    }
})
.delete(async(req, res) => {
    try{
        const {id} = req.params
        const Delete = await todoModel.findByIdAndDelete(id)
        res.status(200).send("Deleted successfully")
    }catch(err){
        console.log(err)
        res.status(400).send("Something went wrong")
    }
})


export default routers