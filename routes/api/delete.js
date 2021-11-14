const express = require("express");
const router = express.Router();
const deleteRecord = require("../../utils/mgdb").deleteRecord;

router.delete("/:newsname/:_id", (req, res, next) => {
	deleteRecord({
		collectionName: req.params.newsname,
		_id: req.params._id
	}).then(result => {
		res.send(result)
	}).catch(err => {
		res.send(err)
	})
})

module.exports = router;
