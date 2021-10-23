const bcrypt = require("bcryptjs");

module.exports = {
    hashSync: password => bcrypt.hashSync(password, 10),
    compareSync: (password, hash) => bcrypt.compareSync(password, hash)
}