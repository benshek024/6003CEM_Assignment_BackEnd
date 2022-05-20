const BasicStrategy = require('passport-http').BasicStrategy;
const users = require('../models/workers');

const verifyPassword = function (user, password) {
  console.log(password)
  return user.workerLoginPwd === password;
}

const checkUserAndPass = async (username, password, done) => {
  let result;

  try {
    result = await users.findByUsername(username);
  } catch (error) {
    console.error(`Error during authentication for user ${username}`);
    return done(error);
  }

  if (result.length) {
    const user = result[0];
    if (verifyPassword(user, password)) {
      console.log(`Successfully authenticated user ${username}`);
      return done(null, user);
    } else {
      console.log(`Password incorrect for user ${username}`);
    }
  } else {
    console.log(`No user found with username ${username}`);
  }
  return done(null, false);
}

const strategy = new BasicStrategy(checkUserAndPass);
module.exports = strategy;