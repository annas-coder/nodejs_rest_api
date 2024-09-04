const jwt = require("jsonwebtoken");

const secret_key = process.env.secret_key;

function verifyToken(req, res, next) {
  try {
    const header = req.header("Authorization");
    const token = header?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }
    console.log(secret_key,"secret_key")
    const decoded = jwt.verify(token, secret_key);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
