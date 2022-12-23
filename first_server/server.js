const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routesHandler = require("./routes/handler.js");

const app = express();

var cors = require("cors");
app.use(cors());

mongoose.connect(
  "mongodb://vishal:vishal@ac-smjg2hl-shard-00-00.yds4a4n.mongodb.net:27017,ac-smjg2hl-shard-00-01.yds4a4n.mongodb.net:27017,ac-smjg2hl-shard-00-02.yds4a4n.mongodb.net:27017/newdb?ssl=true&replicaSet=atlas-a304q7-shard-0&authSource=admin&retryWrites=true&w=majority",
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

app.listen(5000, () => {
  console.log("server is up");
});
