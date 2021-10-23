const router = require('express').Router();
const mgdb = require("../../utils/mgdb");

router.get('/', async (req, res, next) => {
    try {
        const result = await mgdb.findDetail({
            collectionName: "user",
            _id: mgdb.ObjectId(req.query._id)
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