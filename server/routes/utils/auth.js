const jwt = require("jsonwebtoken");
//const config = require("../config");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, config.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({ error: "Invalid Token" });
      } else {
        req.user = decode.id
        next();
      }
    })
  } else {
    return res.status(401).json({ error: "Token is not supplied" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: "User is not the admin" });
}

module.exports = { isAuth, isAdmin };