const router = require('express').Router();
const axios = require("axios");

router.get('/', function (req, res, next) {
    axios.get("http://localhost:3000/api/news/column", {
        params: {
            _limit: 40
        }
    }).then(res1 => {
        res.render("column", {
            ...res1.data,
            from: "column"
        });
    }).catch(err => res.send(err));
});

module.exports = router;