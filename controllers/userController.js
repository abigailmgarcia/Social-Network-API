const asyncHandler = require("express-async-handler");
const { User, Thought } = require("../models")


const getUsers = asyncHandler( async (req, res) => {
    res.json({ message: "testing controller function" });
    const users = await User.find();
    res.json({ users });
});

//get one user
const getSingleUser = async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.params.id }).select("-__v");
        if (!user){
            return res.status(404).json({ message: "No user with that id"});
        }
        res.json(user)
    } catch {
        res.status(500).json(err)
    }
};

//post new user
const createUser =  async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

//put update user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true },
        );

        if (!updateUser) {
            res.status(404).json({ message: "No user with this id" })
        }
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
    };

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