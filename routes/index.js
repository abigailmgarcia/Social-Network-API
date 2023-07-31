const router = require("express").Router();
const { errorHandler } = require("../middleware/errorMiddleware");
const apiRoutes = require("/api");

router.use("/api", apiRoutes);
router.use(errorHandler);


module.exports = router;