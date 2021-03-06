module.exports = {

    // 用户端
    _page: 0,         // 默认页数
    _limit: 10,       // 默认每页数量
    _sort: "time",    // 默认排序字段
    _order: "asc",    // 默认升序排序
    qSearch: 'nikename', // 默认检索字段名
    q: '',            // 默认搜索关键字
    update: null,     // 更新的字段内容
    dbUrl: "mongodb://127.0.0.1:27017",  // 默认数据库连接地址
    dbName: "objdata",   // 默认查询库
    pathPublic: "public",  // 静态资源根
    pathUpload: "upload",  // 上传路径
    pathBanner: "banner",  // 上传的banner
    pathUser: "user",      // 上传的用户头像
    pathNews: "news"       // 上传的其他文件

    // 管理端
}
