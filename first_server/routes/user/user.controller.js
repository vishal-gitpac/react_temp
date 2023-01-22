//created user model by using exported model from user.model
const User = require("./user.model");
const jwt = require("jsonwebtoken");

// exporting create function to use in index.js

exports.create = (req, res) => {
  //creating new instance of User class
  //new User() constructor creates new document in user collection
  const user = new User(req.body);
  //"payload" refers to the second part of the token, which typically contains information about the user or the data being passed in the token
  const payload = { username: user.username };
  const token = jwt.sign(payload, "secret", { expiresIn: "24h" });
  user
    .save()
    .then(
      res.json({
        message: "Authentication successful",
        token: token,
      })
    )
    .catch((error) => res.status(500).send(error));
};
exports.auth = (req, res) => {
  return res.send(req.username);
};
exports.getById = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    const userId = decoded.userId;
    // retrieve the user details from the database
    const user = User.findById(userId);
    return res.send({ user });
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
