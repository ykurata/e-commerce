const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ error: "Email already exists" });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, slat, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save();
      });

      const payload = {
        id: newUser.id,
        name: newUser.name
      };

      jwt.sign(payload, config.SECRET_OR_KEY, { expiresIn: 31556926 }, (err, token) => {
        res.json({ success: true, token: token });
      });
    });
  };
});