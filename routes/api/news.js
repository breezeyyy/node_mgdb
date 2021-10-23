const router = require('express').Router();
const mgdb = require("../../utils/mgdb");

router.get('/:newsname', async (req, res, next) => {
    // 遵循 RESTful方式查询ID详情
    if (req.paramList._id) {
        // 跳转目标接口
        return res.redirect(`/api/news/${req.params.newsname}/${req.paramList._id}`)
    }
 
    // 查询完整列表
    const {
        _page,
        _limit,
        _sort,
        _order,
        q
    } = req.paramList;
    try {
        res.send(await mgdb.findList({
            collectionName: req.params.newsname,
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

// 查询ID详情
router.get('/:newsname/:_id', async (req, res, next) => {
    try {
        res.send(await mgdb.findDetail({
            collectionName: req.params.newsname,
            _id: req.params._id
        }))
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = router;