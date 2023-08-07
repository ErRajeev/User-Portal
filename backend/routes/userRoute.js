const express = require("express");
const router = express.Router();
const User = require("../models/userModels");

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    // const count = await User.count();
    // res.status(200).json(count);
    const getData = await User.find();
    res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ error: "Data Not Found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getDataById = await User.findById({ _id: id });
    if (getDataById) {
      res.status(200).json(getDataById);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Data Not Found" });
  }
});

router.delete("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (updateUser) {
      res.status(200).json({ message: "User Updated" });
    } else {
      res.status(404).json({ error: "User not updated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to find the user" });
  }
});

module.exports = router;
