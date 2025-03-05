const express = require ("express");
const AuthController = require("../../controllers/auth.controller");
const AuthMiddleware = require("../../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword);
router.use(AuthMiddleware.checkRefreshToken);
router.get("/renew-token", AuthController.renewTokenByRefreshToken);

module.exports = router;