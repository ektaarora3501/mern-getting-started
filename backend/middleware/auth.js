const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorisation denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
}
