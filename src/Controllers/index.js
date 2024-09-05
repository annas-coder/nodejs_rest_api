const prisma = require("../Prisma/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user_register.create({
      data: {
        username: username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = await prisma.user_register.findFirst({
      where: { username: username },
    });

    if (!checkUser) {
      return res.status(400).json({ error: "User not found. Please register first." });
    }

    const isValidPassword = await bcrypt.compare(password, checkUser.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    await prisma.user_login.create({
      data: {
        username: username,
      },
    });

    const token = jwt.sign({ userId: checkUser.id }, secret_key, {
      expiresIn: "30m",
    });
  
    return res.status(200).json({
      result: "Successfully logged in",
      Accesstoken: token,
    });
  
  },
};
