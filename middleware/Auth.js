const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (token) {
    try {
      const decode = jwt.verify(token, "hacktech");
      req.user = decode;
    } catch (error) {
      return res.status(401).send("Invalid Token");
    }
  } else {
    return res.status(403).json({ message: "A token is required" });
  }

  return next();
};

module.exports = verifyToken;
