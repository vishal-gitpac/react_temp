const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routesHandler = require("./routes/handler.js");
const userRoutes = require("./routes/user/index");

const app = express();

var cors = require("cors");
app.use(cors());

mongoose.connect(
  "mongodb+srv://vishal:vishal@atlascluster.b57m3rw.mongodb.net/newdb?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongo connected");
    }
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", routesHandler);
app.use("/", userRoutes);
app.listen(5000, () => {
  console.log("server is up");
});
