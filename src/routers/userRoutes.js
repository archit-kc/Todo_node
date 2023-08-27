const express = require("express");
const { getUsers, getCurrentUser, createUser, updateUser, deleteUser, login } = require("../controllers/userController");
const routes = express.Router();
const validateToken = require("../middleWare/validateAccessToken");

routes.route("/").get(validateToken, getUsers);
routes.route("/me").get(validateToken, getCurrentUser);
routes.route("/create").post(createUser);
routes.route("/me").put(validateToken, updateUser);
routes.route("/me").delete(validateToken, deleteUser);
routes.route("/login").post(login)

module.exports = routes;