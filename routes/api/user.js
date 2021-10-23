const router = require('express').Router();
const mgdb = require("../../utils/mgdb");

router.get('/', async (req, res, next) => {
    const {
        _page,
        _limit,
        _sort,
        _order,
        q
    } = req.paramList;
    try {
        res.send(await mgdb.findList({
            collectionName: "user",
            _page,
            _limit,
            _sort,
            _order,
            q
        }))
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;