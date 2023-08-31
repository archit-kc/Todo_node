const express = require("express");
const todoRoutes = require("./routers/todoRoutes");
const errorHandler = require("./middleWare/errorHandler");
const connectDB = require('./config/dbConnection');
const userRoutes = require("./routers/userRoutes");

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use("/api/todo", todoRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Started at:`, port);
})

