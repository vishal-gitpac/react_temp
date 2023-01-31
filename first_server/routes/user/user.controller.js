//created user model by using exported model from user.model
const User = require("./user.model");
const TodoList = require("./todomodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// exporting create function to use in index.js

exports.create = async (req, res) => {
  //creating new instance of User class
  //new User() constructor creates new document in user collection
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  //"payload" refers to the second part of the token, which typically contains information about the user or the data being passed in the token
  const payload = { username: user.username };
  const token = jwt.sign(payload, "secret", { expiresIn: "24h" });
  // User.deleteMany({}, (error) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("All users deleted");
  //   }
  // });
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
exports.login = (req, res) => {
  const username = req.body.username;
  User.findOne({ username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    } else {
      if (!user) {
        return res.status(404).send({ message: "user not found" });
      } else {
        const password = req.body.password;
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            return res.status(500).json({ error });
          }
          if (!result) {
            return res.status(401).json({ message: "Incorrect password" });
          }
          const payload = { username: user.username };
          const token = jwt.sign(payload, "secret", { expiresIn: "24h" });
          return res
            .status(200)
            .send({ message: "successfully logged in", token: token });
        });
      }
    }
  });
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
exports.logout = (req, res) => {
  //console.log(req.session);
  delete req.session;
  return res.send("logged out");
};

//to do list functions
exports.save = (req, res) => {
  console.log(req.username);
  TodoList.findOne({ userId: req.username }, (error, user) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    } else {
      if (!user) {
        const todo = new TodoList({
          userId: req.username,
          items: req.body.todolist,
        });
        todo
          .save()
          .then(res.json({ message: "saved" }))
          .catch((error) => res.status(500).send(error));
        console.log(todo);
        return res.json({ message: "saved" });
      } else {
        user.items = req.body.todolist;
        user.save();
        console.log(user.items);
        return res.json({ message: "saved" });
      }
    }
  });
};
//get todolist
exports.get = (req, res) => {
  const username = req.username;
  TodoList.findOne({ userId: username }, (error, user) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      if (!user) {
        return res.status(404).send({ message: "user not found" });
      } else {
        return res.send(user.items);
      }
    }
  });
};
