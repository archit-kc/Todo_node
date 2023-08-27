const UserModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../../.env");

const getUsers = asyncHandler(async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    if(!userId){
        res.status(401);
        throw new Error("User is not authorized");
    }
    const user = await UserModel.findById(userId);

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
    
})

const login = asyncHandler(async (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400);
        throw new Error("Email or passowrd is missing.")
    }
    const {email, password} = req.body;
    const user =await UserModel.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    if(password && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign(
            {
                user : {
                    userName : user.userName,
                    email: user.email,
                    userId: user.id
                },
            },
            env.JWT_SECRET_KEY,
            {expiresIn : "5m"}
        )
        res.status(200).json({accessToken : accessToken});
    }else{
        res.status(400);
        throw new Error("passowrd is wrong.")
    }
})

const createUser = (async (req, res) => {
    if(!req.body.email || !req.body.userName || !req.body.password) {
        res.status(400)
        throw new Error("Mandatory fields are missing!")
    }else{
        const {email, userName, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            email,
            userName,
            password : hashedPassword
        });
        res.status(200).json(user);
    }
})

const updateUser = asyncHandler(async(req, res) => {
    const userId = req.user.userId;

    if(!userId){
        res.status(401);
        throw new Error("User is not authorized");
    }
    const user = await UserModel.findById(userId);

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    const updatedBody = req.body
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedBody, {new: true});
    if(!updatedUser){
        res.status(403);
        throw new Error("Forbidden Request");
    }
    res.status(200).json(updatedUser);
})

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    if(!userId){
        res.status(401);
        throw new Error("User is not authorized");
    }
    const user = await UserModel.findById(userId);

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    await user.remove();
    res.status(200).json({message : "user deleted"})
})

module.exports = {
    getUsers,
    getCurrentUser,
    createUser,
    updateUser,
    deleteUser,
    login
}