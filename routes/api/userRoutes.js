const { errorHandler } = require("../../middleware/errorMiddleware");
const router = require("express").Router();
const { 
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require("../../controllers/userController");

//get all users and create
router.route("/").get(getUsers).post(createUser);

//gets users, update and delete 
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

//add friend to user
router.route('/:id/friends/:friendId').post(addFriend);
router.route('/:id/friends/:friendId').delete(deleteFriend);

module.exports = router;