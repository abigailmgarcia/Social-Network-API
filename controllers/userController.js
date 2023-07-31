const getUsers = (req, res) => {
    res.json({ message: "testing controller function" });
};

//get one user
const getSingleUser = (req, res) => {
    res.json({ message: "testing controller function for onr user"});
};

//post new user
const createUser = (req, res) => {
    res.json({ message: "created new user" });
};

//put update user
const updateUser = (req, res) => {
    res.json({ message: `updated: ${req.params.id}`});
};

//delete
const deleteUser = (req, res) => {
    res.json({ message: `deleted: ${req.params.id}`});
};


module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
};