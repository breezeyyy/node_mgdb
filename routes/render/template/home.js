const router = require('express').Router();
const axios = require("axios");

router.get('/', (req, res, next) => {
    axios.all([
        axios.get("http://localhost:3000/api/news/banner", {
            params: {
                _limit: 4
            }
        }),
        axios.get("http://localhost:3000/api/news/home", {
            params: {
                _limit: 40
            }
        })
    ]).then(axios.spread((res1, res2) => {
        res.render("home", {
            banner: res1.data.data,
            home: res2.data.data,
            from: "home"
        })
    })).catch(err => res.send(err));
});

module.exports = router;