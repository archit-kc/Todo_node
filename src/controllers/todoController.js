const TodoModel = require("../models/todoModel");
const asyncHandler = require("express-async-handler")

const getTodoLists = asyncHandler(async (req, res) => {
    const todoLists = await TodoModel.find({}, null, {skip:2, limit:2});
    res.status(200).json(todoLists);
})

const getTodoItem = asyncHandler(async (req, res) => {
    try {
        const todoItem = await TodoModel.findById(req.params.id);
        if(todoItem){
            res.status(200).json(todoItem);
        }else{
            res.status(404);
            throw new Error("Item not found");
        }
    } catch (error) {
        res.status(404);
        throw Error("Item not found");
    }
    
})

const createTodoItem = (async (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.completedBy) {
        res.status(400)
        throw new Error("Mandatory fields are missing!")
    }else{
        const {name, description, completedBy} = req.body;
        const todoItem = await TodoModel.create({
            name,
            description,
            completedBy
        });
        res.status(200).json(todoItem);
    }
})

const updateTodoItem = asyncHandler(async(req, res) => {
    try {
        const todoItem = await TodoModel.findById(req.params.id);
        if(todoItem){
            const updatedTodo = await TodoModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true}
            )
            res.status(200).json(updatedTodo);
        }else{
            res.status(404);
            throw new Error("Item not found");
        }
    } catch (error) {
        res.status(403);
        throw Error("Something went wrong.");
    }
    
})

const deleteTodoItem = asyncHandler(async (req, res) => {
    try {
        const todoItem = await TodoModel.findById(req.params.id);
        if(todoItem){
            await todoItem.remove();
            res.status(200).json("Item deleted!", todoItem.id);
        }else{
            res.status(404);
            throw new Error("Item not found");
        }
    } catch (error) {
        res.status(403);
        throw Error("Something went wrong.");
    }
})

module.exports = {
    getTodoLists,
    createTodoItem,
    getTodoItem,
    updateTodoItem,
    deleteTodoItem
}