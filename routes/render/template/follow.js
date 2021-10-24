const router = require('express').Router();
const axios = require("axios");

router.get('/', function (req, res, next) {
    axios.get("http://localhost:3000/api/news/follow", {
        params: {
            _limit: 40
        }
    }).then(res1 => {
        res.render("follow", {
            ...res1.data,
            from: "follow"
        });
    })
});

module.exports = router;