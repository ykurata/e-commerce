const jwt = require('jsonwebtoken');

const getToken = (user) => {
  return jwt.sign(user, config.JWT_SECRET)
}