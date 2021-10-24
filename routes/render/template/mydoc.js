const router = require('express').Router();
const axios = require("axios");

router.get('/', function (req, res, next) {
    const token = req.headers.cookie.split("token=")[1];
    if (token) {
        axios.get("http://localhost:3000/api/user", {
            params: {
                _id: req.query._id,
                token
            }
        }).then(res1 => {
            console.log(res1.data);
            res.render("mydoc", res1.data);
        }).catch(err => res.redirect("/login"));
    } else {
        res.redirect("/login");
    }
});

module.exports = router;