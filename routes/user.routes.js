const router = require("express").Router();
const User = require("../model/user.model");
const Document = require("../model/document.model");
const checkToken = require("../config/config");
const bcrypt = require("bcrypt");


// ------------------------------------ index (all) ------------------------------------ //

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({
      users,
    });
  } catch (e) {
    res.status(500).json({
      message: "Unable to retrieve ALL USERS data",
    });
  }
});

// ------------------------------------ show ------------------------------------ //

router.get("/profile", checkToken, async (req, res) => {
  try {
    let user = await User.findById(req.user.id, "-password").populate("documents");
    res.status(200).json({
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Unable to retrieve USER data",
    });
  }
});

// ------------------------------------ edit ------------------------------------ //

router.put("/:id", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = await User.findByIdAndUpdate(req.params.id, {
      name: name,
      email: email,
      password: hashedPassword
    });

    res.status(200).json({
      message: "USER data successfully updated",
      user,
    });


  } catch (e) {
    res.status(500).json({
      message: "Unable to edit USER data",
    });
  }
});

// ------------------------------------ delete ------------------------------------ //

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "USER successfully removed from database",
    });
  } catch (e) {
    res.status(500).json({
      message: "Unable to remove USER data",
    });
  }
});

// ------------------------------------ export ------------------------------------ //

module.exports = router;