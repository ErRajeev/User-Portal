const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/userModels");
const app = express();
dotenv.config();
app.use(express.json());

mongoose.connect(`${process.env.URL}userportal`).then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log("Db Connected");
  });
});

app.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(500)
      .json({ error: "User with this email already exists" });
  } else {
    try {
      const userAdd = await User.create({
        name: name,
        email: email,
        age: age,
      });
      res.status(200).json({ massage: `${name} Added` });
    } catch (error) {
      res.status(500).json("Can't post");
    }
  }
});

app.get("/", async (req, res) => {
  try {
    // const count = await User.count();
    // res.status(200).json(count);
    const getData = await User.find();
    res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ error: "Data Not Found" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findOneAndDelete({ _id: id });
    if (deleteUser) {
      res.status(200).json({ message: "User Deleted" });
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (updateUser) {
      res.status(200).json({ massage: "User Updated" });
    } else {
      res.status(404).json({ error: "User not updated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to find the user" });
  }
});
