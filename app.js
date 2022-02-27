const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const slowDown = require("express-slow-down");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const index = require("./errors/index");
const app = express();

app.set("trust proxy", 1); // if app is behind nginx/or proxy
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, //60 requests per ip request
  })
);
app.use(
  slowDown({
    windowMs: 10 * 60 * 1000, // 10 minutes
    delayAfter: 20, // start delaying requests after 20 request in 10 minutes
    delayMs: 100, // add 100ms to each response
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
// Routes
app.use("/api/v1/auth", indexRouter);
app.use("/api/v1/user", indexRouter);
app.use("/api/v1/book", indexRouter);
app.use("/api/v1/users", usersRouter);

// use middleware
//app.use(index);

module.exports = app;
