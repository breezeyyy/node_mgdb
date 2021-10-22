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
 * @returns 
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
    client,
    ObjectId
}))));

/**
 * 列表数据查询
 * @param {object} param0 
 * @param {string} [param0.q] 在title中的搜索关键字
 * @param {string} [param0._sort] 返回数据按指定键降序排序
 * @param {number} [param0._page] 返回数据跳过的页数
 * @param {number} [param0._limit] 返回数据每页的数量
 * @param {string} param0.collectionName 访问的集合名
 * @returns 
 */
const findList = ({
    q,
    _sort,
    _page,
    _limit,
    collectionName
}) => new Promise((reslove, reject) => open({
    collectionName
}).then(({
    collection,
    client
}) => collection.find(q ? {
    nikename: eval(`/${q}/`)
} : {}, {
    sort: _sort ? {
        [_sort]: -1
    } : {
        time: -1
    },
    skip: _page * _limit,
    limit: _limit
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

exports.open = open;
exports.findList = findList;