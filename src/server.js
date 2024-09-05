const express = require("express");
const cors = require("cors");
const prisma = require("./Prisma/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Controllers = require("./Controllers/index");
const AuthuMiddleWare = require("./AuthuMiddleware/index")

const app = express();

const port = process.env.Server_Port;

app.use(cors("*"));

app.use(express.json()); // parse requests of content-type - application/json

app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

app.get("/" , Controllers.getUserAll);

app.post("/register_user", Controllers.createUser);

app.post("/login", Controllers.loginUser);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
