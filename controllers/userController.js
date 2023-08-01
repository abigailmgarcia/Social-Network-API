const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const mongoose = require("mongoose");


//GET all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json({ users });
});

//get one user
const getSingleUser = async (req, res, next ) => {
    try{
        const user = await User.findOne({ _id: req.params.id }).select("-__v");
        if (!user){
            return res.status(404).json({ message: "No user with that id"});
        }
        res.json(user)
    } catch {
        next(err);
    }
};

//post create new user
// POST api/users
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
            { _id: req.params.id },
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: "No user with this id" })
        }
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
    };

//delete
const deleteUser = async (req, res) => {
    try{
        const deleteUser = await User.findOneAndRemove({ _id:req.params.id })
        if(!deleteUser) {
            return res.status(404).json({ message: "No user with that id"})
        }
        res.json({ message: "user deleted sucessfully", deleteUser });
    } catch (err) {
        res.status(500).json(err);
    }
};

//add friend
const addFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        const updateUser = await User.findOneAndUpdate(
            { _id: id },
            { $addToSet: { friends: friendId }},
            { new: true }
        );
        if(!updateUser) {
            return res.status(404).json({ message: 'User not found '});
        }
        res.json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

//delete friend
const deleteFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { friends: friendId }},
            { new: true }
        );

        if(!updatedUser){
            return res.status(404).json({ message: "User nnot found"});
        }
        const { friends } = updatedUser;
        res.json({
            message: 'friend delted successfully',
            friends: friends,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
};