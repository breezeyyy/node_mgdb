const router = require('express').Router();
const mgdb = require("../../utils/mgdb");

router.get('/', async (req, res, next) => {
    const {
        _id
    } = req.paramList;
    res.send(await mgdb.findDetail({
        collectionName: "user",
        _id
    }))
});

module.exports = router;