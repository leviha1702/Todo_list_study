const express = require ("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.use("/users", require("./users"));

module.exports = router;