require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/db");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/item.routes");

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
app.use(cookieParser());

// serve static files from the build folder
// const publicDirectoryPath = path.join(__dirname, "../client");
// app.use(express.static(publicDirectoryPath));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// Handle all other routes by serving the 'index.html' file
// app.get("*", (req, res) => {
//   const indexPath = path.join(__dirname, "../client", "index.html");
//   console.log("Serving index.html from:", indexPath);
//   res.sendFile(indexPath);
// });

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

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
