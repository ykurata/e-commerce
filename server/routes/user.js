const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const getToken = require('../utils');

const User = require("../models/User");

router.post('/signin', async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (signinUser) {
    res.send({
      id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    });
  } else {
    req.status(401).send({ msg: 'Invalid Email or Password' });
  }
})

router.get('/createAdmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Admin',
      email: 'admin@email.com',
      password: '1234',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});


module.exports = router;