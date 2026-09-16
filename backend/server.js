const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const todoRouter = require("./src/routes/todoRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todo", todoRouter);

connectDB().then(() => {
  app.listen(3000, () => console.log("running on 3000"));
});
