const express = require('express')
const router = express.Router();
const auditNews = require("../../utils/mgdb").auditNews;

router.get('/:newsname/:_id', (req, res, next) => {
	auditNews({
		collectionName: req.params.newsname,
		_id: req.params._id,
		update: req.paramList.update
	}).then(result => {
		res.send(result)
	}).catch(err => {
		res.send(err)
	})
})

module.exports = router
