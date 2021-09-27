const express = require("express");
const connect = require("./config/db");

const userController = require("./controller/user.controller");

const app = express();
app.use(express.json());

app.use("/users", userController);

app.listen(8030, async () => {
  await connect();
  console.log("App responded");
});
