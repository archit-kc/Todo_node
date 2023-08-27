const express = require("express");
const { getTodoLists, getTodoItem, createTodoItem, updateTodoItem, deleteTodoItem } = require("../controllers/todoController");
const routes = express.Router();
const validateToken = require("../middleWare/validateAccessToken"); 

routes.route("/todoLists").get(validateToken, getTodoLists);
routes.route("/:id").get(validateToken, getTodoItem);
routes.route("/create").post(validateToken, createTodoItem);
routes.route("/:id").put(validateToken, updateTodoItem);
routes.route("/:id").delete(validateToken,deleteTodoItem);

module.exports = routes;