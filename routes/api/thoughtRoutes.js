const router = require("express").Router();
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
} = require("../../controllers/thoughtController");

// get and create user
router.route("/").get(getThoughts).post(createThought);

//Get update and delte
router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);

module.exports = router;