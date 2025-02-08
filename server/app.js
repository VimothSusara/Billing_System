require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth.routes");

// express app
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// middleware
app.use(express.json());
// app.use(bodyParser.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// routes
app.use("/api/auth", authRoutes);

// db connection
sequelize
  .authenticate()
  .then(() => console.log("db connection established"))
  .catch((err) => console.error("Unable to connect to the database", err));

// sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
// });
