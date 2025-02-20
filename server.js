const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const connectionDb = require("./config/dbConnection");
const PORT = process.env.PORT;

connectionDb();
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
