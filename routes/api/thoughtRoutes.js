const router = require("express").Router();
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thoughtController");

// get and create user
router.route("/").get(getThoughts).post(createThought);

//Get update and delte
router.route("/:id")
.get(getThought)
.put(updateThought)
.delete(deleteThought);

router.route("/:id/reaction").post(addReaction);
router.route("/:id/reaction/:reactionId").delete(deleteReaction)

module.exports = router;