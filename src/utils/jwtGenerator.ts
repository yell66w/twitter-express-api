var jwt = require("jsonwebtoken");
require("dotenv").config();
function jwtGenerator(userId) {
  const payload = {
    user: userId,
  };

  const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
  console.log(token, payload);
  return token;
}

module.exports = jwtGenerator;
