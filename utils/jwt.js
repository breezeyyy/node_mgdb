const jwt = require("jsonwebtoken");

module.exports = {
    sign: (username, _id) => jwt.sign({username, _id}, "breeze", {expiresIn: 60 * 60 * 24}),
    verify: token => jwt.verify(token, "breeze")
}