const mongodb = require("mongodb");
const initParams = require("../config/global");
const mongoCt = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

/**
 * 连接数据库
 * @param {object} param0
 * @param {string} [param0.dbUrl] 数据库地址
 * @param {string} [param0.dbName] 访问的库名
 * @param {string} param0.collectionName 访问的集合名
 * @returns {Promise}
 */
const open = ({
	dbUrl = initParams.dbUrl,
	dbName = initParams.dbName,
	collectionName
}) => new Promise((reslove, reject) => mongoCt.connect(dbUrl, (err, client) => (err ? reject({
	err: 1,
	msg: "数据库连接失败"
}) : reslove({
	collection: client.db(dbName).collection(collectionName),
	client
}))));

/**
 * 列表数据查询
 * @param {object} param0
 * @param {string} [param0.q] 在title中的搜索关键字
 * @param {string} [param0._sort] 返回数据按指定键排序
 * @param {string} [param0._order] 返回数据按指定键的排序方式
 * @param {number} [param0._page] 返回数据跳过的页数
 * @param {number} [param0._limit] 返回数据每页的数量
 * @param {string} param0.collectionName 访问的集合名
 * @returns {Promise}
 */
const findList = ({
	qSearch,
	q,
	_sort,
	_order,
	_page,
	_limit,
	collectionName
}) => new Promise((reslove, reject) => open({
	collectionName
}).then(({
	collection,
	client
}) => collection.find({
	// eval 将传入的字符串当作JS代码来执行
	[qSearch]: eval(`/${q}/`)
}, {
	sort: {
		[_sort]: _order === "asc" ? 1 : -1
	},
	skip: _page * _limit,
	limit: _limit - 0
}).toArray((err, data) => {
	err && data.length > 0 ? reject({
		err: 1,
		msg: "集合查询失败"
	}) : reslove({
		err: 0,
		msg: "集合查询成功",
		data
	});
	client.close();
})).catch(err => reject(err)));

/**
 * 详情数据查询
 * @param {object} param0
 * @param {string} param0.collectionName 访问的集合名
 * @param {string} param0._id 要查询的ID
 * @returns {Promise}
 */
const findDetail = ({
	collectionName,
	_id
}) => new Promise((reslove, reject) => open({
	collectionName
}).then(({
	collection,
	client
}) => collection.find({
	_id: ObjectId(_id)
}).toArray((err, data) => {
	err ? reject({
		err: 1,
		msg: "详情查询失败"
	}) : reslove({
		err: 0,
		msg: "详情查询成功",
		data: data[0]
	});
	client.close();
})).catch(err => reject(err)))

const deleteRecord = ({
	collectionName,
	_id
}) => new Promise((resolve, reject) => {
	open({
		collectionName
	}).then(({
		collection,
		client
	}) => {
		if (_id && _id.length === 24) {
			collection.deleteOne({
				_id: ObjectId(_id)
			}, (err, result) => {
				if (result.deletedCount) {
					resolve({
						err: 0,
						title: "数据删除成功"
					})
				} else {
					reject({
						err: 1,
						title: "数据删除失败"
					})
					
				}
				client.close();
			})
			
		} else {
			reject({
				err: 1,
				title: "id格式不正确"
			})
			client.close();
		}
	})
})

const auditNews = ({
	collectionName,
	_id,
	update
}) => new Promise((resolve, reject) => {
	open({
		collectionName
	}).then(({
		collection,
		client
	}) => {
		if (_id && _id.length === 24) {
			collection.updateOne({
				_id: ObjectId(_id)
			}, {
				$set: {
					"audit": update
				}
			}, (err, result) => {
				result.modifiedCount ? resolve({
					err: 0,
					title: "文章审核通过"
				}) : reject({
					err: 1,
					title: "文章审核未通过"
				})
				client.close();
			})
		} else {
			reject({
				err: 1,
				title: "id格式不正确"
			})
			client.close();
		}
	}).catch(err => reject(err));
})

const listLength = ({
	collectionName,
	q,
	qSearch,
	_sort
}) => new Promise((resolve, reject) => {
	open({
		collectionName
	}).then(({
		collection,
		client
	}) => {
		collection.find({
			[qSearch]: new RegExp(q, "g")
		}).toArray((err, result) => {
			if (!err && result.length > 0) {
				resolve({
					err: 0,
					title: "读取数据成功",
					data: result.length
				})
			} else {
				reject(err)
			}
			client.close();
		})
	}).catch((err, client) => {
		reject({
			err: 1,
			title: "兜库失败"
		})
	})
})

exports.open = open;
exports.findList = findList;
exports.findDetail = findDetail;
exports.ObjectId = ObjectId;
exports.deleteRecord = deleteRecord;
exports.auditNews = auditNews;
exports.listLength = listLength;
