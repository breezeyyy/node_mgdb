const router = require('express').Router()
const count = require("../../utils/mgdb").listLength;

router.get("/:newsname", (req, res, next) => {
    count({
        collectionName: req.params.newsname,
        q: req.paramList.q,
        qSearch: req.paramList.qSearch
    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router
