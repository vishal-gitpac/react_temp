const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  // removes 'Bearer` from token
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (token) {
    //secret is with us to verify jwt token
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.status(403).send("invalid credentials");
        //console.log(err);
      } else {
        //decoded contains username
        req.username = decoded.username;
        next();
      }
    });
  }
}

module.exports = verifyJWT;
