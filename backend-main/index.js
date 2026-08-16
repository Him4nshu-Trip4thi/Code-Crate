const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookie = require('cookie');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");
const mainRouter = require("./routes/main.router");
const { generalLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const { Command } = require('commander');
const program = new Command();

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

dotenv.config();

program
  .name('backend')
  .description('Code Crate backend CLI')
  .version('1.0.0');

program
  .command('start')
  .description('Starts a new server')
  .action(() => startServer());

program
  .command('init')
  .description('Initialise a new repository')
  .action(() => initRepo());

program
  .command('add <file>')
  .description('Add a file to the repository')
  .action((file) => addRepo(file));

program
  .command('commit <message>')
  .description('Commit the staged files')
  .action((message) => commitRepo(message));

program
  .command('push')
  .description('Push commits to S3')
  .action(() => pushRepo());

program
  .command('pull')
  .description('Pull commits from S3')
  .action(() => pullRepo());

program
  .command('revert <commitID>')
  .description('Revert to a specific commit')
  .action((commitID) => revertRepo(commitID));

program.parse(process.argv);

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.json());
  app.use(helmet());
  // lightweight cookie parser using 'cookie' (avoid extra dependency issues)
  app.use((req, res, next) => {
    const raw = req.headers.cookie;
    try {
      req.cookies = raw ? cookie.parse(raw) : {};
    } catch (e) {
      req.cookies = {};
    }
    next();
  });

  const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/codecrate";
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI not set — using local default:", mongoURI);
  }

  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Unable to connect : ", err));

  const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5175';
  app.use(cors({ origin: frontendOrigin, credentials: true }));

  // Apply a general rate limiter to all API routes
  app.use(generalLimiter);

  app.use("/", mainRouter);

  // Centralized error handler (should be after routes)
  app.use(errorHandler);

  let user = "test";
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("=====");
      console.log(user);
      console.log("=====");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operations called");
    // CRUD operations
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
}
