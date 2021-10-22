const jwt = require("../utils/jwt");
const initParams = require("../config/global");

module.exports = (req, res, next) => {
    // 组合所有携带信息
    req.paramList = {
        ...req.headers,
        ...req.query,
        ...req.body
    }

    // 初始化参数
    req.paramList._page = req.paramList._page || initParams._page;
    req.paramList._limit = req.paramList._limit || initParams._limit;
    req.paramList._sort = req.paramList._sort || initParams._sort;
    req.paramList.q = req.paramList.q || initParams.q;

    // console.log(req.paramList);

    // try {
    //     console.log(jwt.verify(req.paramList.token));
    // } catch (error) {
    //     res.send({
    //         err: 1,
    //         msg: "登录已过期，请重新登录"
    //     })
    // }
    next();
}