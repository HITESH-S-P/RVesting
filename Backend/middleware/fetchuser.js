var jwt = require("jsonwebtoken");
const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ success: false, error: "Token not found" });
  }
  try {
    const data = jwt.verify(token, "RVesting");
    req.user = data.user;
    next();
  } catch (error) {
    req.user = null;
    if (!res.headerSent) {
      res.status(401).send({
        success: false,
        error: "Please use valid token.",
        message: error,
      });
    }
  }
};

module.exports = fetchuser;
