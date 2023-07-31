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


router.route("/").get(getUsers).post(createUser);

//gets users
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

//add friend to user
router.route("/:id/friends/:friendId").post(addFriend);
router.route("/:id/friends/:friendId").delete(deleteFriend);


// //get one user
// router.get("/", (req, res) => {
//     res.json({ message: "great job"});
// });

// //create user
// router.post("/", (req, res) => {
//     res.json({ message: "great work" });
// });

// //update user
// router.put("/:id", (req, res) => {
//     res.json({ message: `update user ${req.params.id}` });
// });

// //delete user

// router.delete("/:id", (req, res) => {
//     res.json({ message: `delete user ${req.params.id}` });
// });

module.exports = router;