const router = require('express').Router();
const mgdb = require("../../utils/mgdb");

router.post('/', function (req, res, next) {
    res.send("reg");
});

module.exports = router;