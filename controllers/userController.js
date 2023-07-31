const asyncHandler = require("express-async-handler");
const { User, Thought } = require("../models")


const getUsers = asyncHandler( async(req, res) => {
    res.json({ message: "testing controller function" });
    const users = await User.find();
    res.json({ users });
});

//get one user
const getSingleUser = async (req, res) => {
    res.json({ message: "testing controller function for onr user"});
};

//post new user
const createUser =  async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        res.status(500).json(err);
    }
};

//put update user
const updateUser = asyncHandler(async (req, res) => {
    res.json({ message: `updated: ${req.params.id}`});
});

//delete
const deleteUser = asyncHandler (async (req, res) => {
    res.json({ message: `deleted: ${req.params.id}`});
});


module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
};