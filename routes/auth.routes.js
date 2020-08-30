require("dotenv").config();
const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ------------------------------------ register ------------------------------------ //

router.post("/register", async (req, res) => {
  try {
    let {name, email, password } = req.body;
    let user = new User({ name, email });
    let hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    
    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_PHRASE,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          token,
          message: "Successfully registered; token received",
        });
      }
    );

    // res.status(200).json({
    //   message: "Registration succesful!",
    // });
  }
  catch (e) {
    res.status(500).json({
      message: "Registration failed",
    });
  }
})

// ------------------------------------ login ------------------------------------ //

router.post("/login", async (req, res) => {
  let {email, password} = req.body;
  
  try {
    let user = await User.findOne({ email });
   
    if (!user) {
      return res.status(400).json({ message: "User profile not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_PHRASE,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, message: "Succesfully logged in" });
      }
    );

  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
})

// ------------------------------------ test route ------------------------------------ //

router.get("/", (req, res) => {
  res.status(200).json({ message: "path is working" });
});

// ------------------------------------ export ------------------------------------ //

module.exports = router;
