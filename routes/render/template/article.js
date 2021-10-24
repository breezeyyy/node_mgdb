const router = require('express').Router();
const axios = require("axios");

router.get('/', (req, res, next) => {
    axios.get(`http://localhost:3000/api/news/${req.query.from}/${req.query._id}`).then(res1 => {
        const time = new Date(res1.data.data.time);
        res1.data.data.time = `${time.getFullYear()}年${time.getMonth() < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)}月${time.getDate() < 10 ? '0' + time.getDate() : time.getDate()}日 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        res.render("article", res1.data.data);
    })
});

module.exports = router;