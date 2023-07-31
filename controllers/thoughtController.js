const asyncHandler = require("express-async-handler");
const { Thought, User } = require("../models");

//get all thoughs
const getThoughts = asyncHandler(async (req, res) => {
    const thoughts = await Thought.find();
    res.json({ thoughts });
});

const getThought = async (req, res, next ) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.id }).select("-__v");
        if(!thought) {
            return res.status(404).json({ message: "No thought with that id"});
        }
        res.json(thought)
    } catch(err) {
        next(err);
    }
};

//new thought POST
const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            {$push: {thoughts: thought._id}},
            {new: true}
        )
        if(!user){
            throw new Error('User not found');
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

//put 
const updateThought = async (req, res) => {
    try {
        const updateThought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true },
        );

        if(!updateThought) {
            res.status(404).json({ message: "No thought with this id" }); 
        }
        res.json(updateThought);
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

//add rection
const addReaction = async (req, res) => {
    try{
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true },
        );
        if(!thought){
            return res.status(404).json ({message: 'No thought with id'})
        }
        // console.log(req.params)
        req.json(thought)
        } catch (err) {
            res.status(500).json(err)
        }
    }

//delete reaction
const deleteReaction = async (req, res) => {
    try{
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true },
        );
        if(!thought) {
            return res.status(404).json({ message: "No thought with that id"})
        } 
        res.json(thought)
    } catch (err){
        res.status(500).json(err);
    }
};


module.exports = {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
}