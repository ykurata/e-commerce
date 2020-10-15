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
  if (!isValid) {
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
      password2: req.body.password2,
      isAdmin: req.body.isAdmin
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save();
      });

      const payload = {
        id: newUser.id,
        name: newUser.name
      };

      jwt.sign(payload, config.JWT_KEY, { expiresIn: 31556926 }, (err, token) => {
        res.json({ success: true, token: token });
      });
    });
  };
});

// Login route
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          };

          jwt.sign(payload, config.JWT_KEY, { expiresIn: 31556926 }, (err, token) => {
            res.json({ success: true, token: token });
          });
        } else {
          return res.status(400).json({ error: "Password is incorrect" });
        }
      })
    };
  } catch (err) {
    console.log(err);
  }
});

router.put("/create-admin", async (req, res) => {
  try {
    const user = new User({
      name: "Admin",
      email: "admin@email.com",
      password: "password",
      isAdmin: true
    });
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await User.remove({ _id: req.params.id });
    return res.status(200).json({ message: "deleted a user" });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;