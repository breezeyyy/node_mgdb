const router = require('express').Router();

router.get('/', function (req, res, next) {
    res.render('mydoc');
});

module.exports = router;