const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const NewSchema = new mongoose.Schema({
  id: Number,
  title: String,
  info: String,
});

const newModel = new mongoose.model("question1", NewSchema);

// const data = new newModel(
//   {
//     id: 1,
//     title: "On which Framework this website is bulit?",
//     info: "React Framework",
//   },
// );
// data.save();

// if we use insertMany it is inserting duplicate elements each time we run code the code
const documents = [
  {
    id: 1,
    title: "On which Framework this website is bulit?",
    info: "React Framework",
  },
  {
    id: 2,
    title: "What functionalities does this to do has?",
    info: "The basic functinalaties that a todo should have add,delete and responsive todo box",
  },
  {
    id: 3,
    title: "What functionalities does this FAQ has?",
    info: "Toggling button which enables to know the answer for the questions",
  },
];

const bulkOps = documents.map((doc) => ({
  updateOne: {
    filter: { id: doc.id },
    update: { $set: doc },
    upsert: true,
  },
}));

const data = async () => {
  const newl = await newModel.bulkWrite(bulkOps);
};
data();
const data1 = async () => {
  const result = await newModel.find();
  console.log(result);
};
data1();

router.get("/Faq", (req, res) => {
  const questions = [
    {
      id: 1,
      title: "On which Framework this website is bulit?",
      info: "React Framework",
    },
    {
      id: 2,
      title: "What functionalities does this to do has?",
      info: "The basic functinalaties that a todo should have add,delete and responsive todo box",
    },
    {
      id: 3,
      title: "What functionalities does this FAQ has?",
      info: "Toggling button which enables to know the answer for the questions",
    },
  ];
  res.end(JSON.stringify(questions));
});
router.post("/addnew", (req, res) => {
  res.end("NA");
});

module.exports = router;
