const asyncHandler = require("express-async-handler");
const { User } = require("../models")


const getUsers = asyncHandler( async (req, res) => {
    res.json({ message: "testing controller function" });
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
            { _id: req.params.idd },
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
const deleteUser = async (req, res) => {
    try{
        const deleteUser = await User.findOneAndRemove({ _id:req.params.id })
        if(!deleteUser) {
            return res.status(404).json({ message: "No user with that id"})
        }
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
            { new: true },
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
const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            {$pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        );
        if(!thought){
            return res.status(404).json({ message: "No thought with that id"})
        }
        res.json(thought)
    } catch(err) {
        res.status(500).json(err);
    }
}
module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
};