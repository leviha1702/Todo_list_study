const express = require ("express");
const AuthController = require("../../controllers/auth.controller");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword);

module.exports = router;