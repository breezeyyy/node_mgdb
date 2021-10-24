const router = require('express').Router();
const axios = require("axios");

router.get('/', function (req, res, next) {
    res.render("reg");
});

module.exports = router;