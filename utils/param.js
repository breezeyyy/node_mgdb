const jwt = require("../utils/jwt");
const initParams = require("../config/global");

module.exports = (req, res, next) => {
    // 组合所有携带信息
    req.paramList = {
        ...req.headers,
        ...req.query,
        ...req.body
    }
    // console.log('body', req.paramList)
    // 初始化参数
    req.paramList._page = req.paramList._page || initParams._page;
    req.paramList._limit = req.paramList._limit || initParams._limit;
    req.paramList._sort = req.paramList._sort || initParams._sort;
    req.paramList._order = req.paramList._order || initParams._order;
    req.paramList.qSearch = req.paramList.qSearch || initParams.qSearch;
    req.paramList.q = req.paramList.q || initParams.q;
    req.paramList.update = req.paramList.update || initParams.update;
    
    // console.log(req.paramList);

    // 登录/注册/登出 不需要验证token
    if (/user/.test(req.url)) {
        try {
            // console.log(req.paramList.token)
            req.paramList.decode = jwt.verify(req.paramList.token);
            next();
        } catch (error) {
            res.send({
                err: 1,
                msg: "登录已过期，请重新登录"
            })
        }
    } else {
        next();
    }
}
