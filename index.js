const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.use("/", (req, res) => {
  res.send("Hello Server");
});
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.db_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
