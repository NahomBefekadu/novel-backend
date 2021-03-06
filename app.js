const express = require("express");
require("dotenv").config();
require("express-async-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const slowDown = require("express-slow-down");

// Cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
//middleware
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const favRouter = require("./routes/favRoute");
//const usersRouter = require("./routes/userRoute");
const bookRouter = require("./routes/bookRoute");
const authRouter = require("./routes/authRoute");
const personalBookRouter = require("./routes/personalBookRoute");
const app = express();

app.set("trust proxy", 1); // if app is behind nginx/or proxy
/* app.use(
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
); */
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/fav", favRouter);
app.use("/api/v1/personal", personalBookRouter);
//app.use("/api/v1/users", usersRouter);

// use middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
