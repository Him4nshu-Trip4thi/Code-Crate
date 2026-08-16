const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();
const { verifyAuth } = require('../middleware/authMiddleware');

repoRouter.post("/repo/create", verifyAuth, repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.get("/repo/:id", repoController.fetchRepositoryById);
repoRouter.get("/repo/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userID", repoController.fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id", verifyAuth, repoController.updateRepositoryById);
repoRouter.delete("/repo/delete/:id", verifyAuth, repoController.deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", verifyAuth, repoController.toggleVisibilityById);

module.exports = repoRouter;
