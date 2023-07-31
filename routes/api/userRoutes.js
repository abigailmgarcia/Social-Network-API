const router = require("express").Router();
const { getUsers } = require("../../controllers/userController");


//gets users
router.get("/", getUsers)

//get one user
router.get("/", (req, res) => {
    res.json({ message: "great job"});
});

//create user
router.post("/", (req, res) => {
    res.json({ message: "great work" });
});

//update user
router.put("/:id", (req, res) => {
    res.json({ message: `update user ${req.params.id}` });
});

//delete user

router.delete("/:id", (req, res) => {
    res.json({ message: `delete user ${req.params.id}` });
});

module.exports = router;