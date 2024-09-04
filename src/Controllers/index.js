const prisma = require("../Prisma/index");
const jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();

const secret_key = process.env.secret_key;

module.exports = {
  getUserAll: async (req, res, next) => {
    try {
      const users = await prisma.user_register.findMany();
      res.status(200).send({
        status: "success",
        data: users,
      });
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while fetching users." });
    }
  },

  createUser: async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: "Please enter all the values." });
    }

    const checkUser = await prisma.user_register.findFirst({
      where: { username: username },
    });

    if (checkUser) {
      return res.status(400).send({ error: "User already exists." });
    }

    const user = await prisma.user_register.create({
      data: {
        username: username,
        password: password,
      },
      select: {
        id: true,
        username: true,
        password: true,
        createdAt: true,
      },
    });

    return res
      .status(201)
      .send({ message: "User registered successfully.", user: user });
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: "Mismatch user" });
    }

    const checkUser = await prisma.user_register.findFirst({
      where: { username: username, password: password },
    });

    if (checkUser?.username === username && checkUser?.password === password) {
      const token = jwt.sign({ userId: checkUser }, secret_key, {
        expiresIn: "30m",
      });
      process.env.secret_key = token;
      return res.status(200).json({
        result: "successfully login",
        Accestoken: token,
      });
    } else {
      return res.status(500).json({
        result: "please update validate username and password",
      });
    }
  },
};
