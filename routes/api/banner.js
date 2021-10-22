const router = require('express').Router();
const mgdb = require("../../utils/mgdb");

router.get('/', (req, res, next) => {
    mgdb.open({
        collectionName: "banner"
    }).then(({
        collection,
        client
    }) => collection.find().toArray((err, data) => {
        client.close();
        res.send({
            err: err ? 1 : 0,
            title: `数据查询${err ? "失败" : "成功"}`,
            data
        })
    })).catch(err => res.send({
        err: 1,
        title: "数据库连接失败",
        err
    }))
});

module.exports = router;