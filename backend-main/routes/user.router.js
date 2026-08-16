const express = require("express");
const userController = require("../controllers/userController");
const { validateSignup, validateLogin } = require("../middleware/validateAuth");
const { authLimiter } = require("../middleware/rateLimiter");

const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", authLimiter, validateSignup, userController.signup);
userRouter.post("/login", authLimiter, validateLogin, userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.put("/updateProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteProfile/:id", userController.deleteUserProfile);

module.exports = userRouter;
