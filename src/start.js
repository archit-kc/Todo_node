const express = require("express");
const todoRoutes = require("./routers/todoRoutes");
const errorHandler = require("./middleWare/errorHandler");
const connectDB = require('./config/dbConnection');
const userRoutes = require("./routers/userRoutes");
const env = require("../.env")

connectDB();

const app = express();
const port = env.PORT || 3000;

app.use(express.json())
app.use("/api/todo", todoRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Started at: http://localhost:${port}`);
})

