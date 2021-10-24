const router = require('express').Router();
const mgdb = require("../../utils/mgdb");

router.get('/', async (req, res, next) => {
    const _id = req.query._id || req.paramList.decode._id;
    try {
        const result = await mgdb.findDetail({
            collectionName: "user",
            _id
        });
        delete result.data.username;
        delete result.data.password;
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;