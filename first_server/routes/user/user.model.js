const mongoose = require("mongoose");

const NewSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = new mongoose.model("users", NewSchema);
//to delete all users
/*User.deleteMany({}, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("All users deleted");
  }
});*/
module.exports = User;
