const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const connectionDb = require("./config/dbConnection");
const PORT = process.env.PORT;
const errorHandler = require("./middleware/errorHandler");

connectionDb();
app.use(express.json());
app.use("/api/", require("./routes/scoreRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
