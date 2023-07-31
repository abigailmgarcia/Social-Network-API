const asyncHandler = require("express-async-handler");
const { Thought, User } = require("../models");

//get all thoughs
const getThoughts = asyncHandler(async (req, res) => {
    const thoughts = await Thought.find();
    res.json({ thoughts });
});

const getThought = async (req, res, next ) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select("-__v");
        if(!user) {
            return res.status(404).json({ message: "No user with that id"});
        }
        res.json(user)
    } catch(err) {
        next(err);
    }
};

//new thought POST
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

//put 
const updateThought = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true },
        );

        if(!updatedUser) {
            res.status(404).json({ message: "No user with this id" });
        }
        res.json(updatedUser);
    } catch(err) {
        res.status(500).json(err);
    }
};

//delete
const deleteThought = async (req, res) => {
    try{
        const deleteUser = await User.findOneAndRemove({ _id: req.params.id })
        if(!deleteUser){
            return res.status(404).json({ message: "No user with that id"})
        }
    } catch(err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    updateThought,
    deleteThought
}