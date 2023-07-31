const asyncHandler = require("express-async-handler");


const getUsers = asyncHandler( async(req, res) => {
    res.json({ message: "testing controller function" });
});

//get one user
const getSingleUser = asyncHandler(async (req, res) => {
    res.json({ message: "testing controller function for onr user"});
});

//post new user
const createUser =  asyncHandler(async (req, res) => {
    if(!req.body.username){
    res.status(400).json({ message: "missing info" });
}
    res.json({ message: "created a new user" });
});

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