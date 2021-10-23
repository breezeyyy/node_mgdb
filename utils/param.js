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
    req.paramList._order = req.paramList._order || initParams._order;
    req.paramList.q = req.paramList.q || initParams.q;

    // console.log(req.paramList);

    // 登录/注册/登出 不需要验证token
    if (/login|reg|logout/.test(req.url)) {
        next();
    } else {
        try {
            req.paramList.decode = jwt.verify(req.paramList.token);
            next();
        } catch (error) {
            res.send({
                err: 1,
                msg: "登录已过期，请重新登录"
            })
        }
    }
}