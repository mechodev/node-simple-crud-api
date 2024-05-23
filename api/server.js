const express = require("express");
const connectDB = require("./config/database");
const app = express();
const dotenv = require("dotenv").config();
const port = 5000;

//connecying to db
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.route"));

//to satrt server
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
