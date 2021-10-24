const router = require('express').Router();
const open = require("../../utils/mgdb").open;
const bcrypt = require("../../utils/bcrypt");
const jwt = require("../../utils/jwt");

router.post('/', function (req, res, next) {
    let {
        username,
        password
    } = req.paramList;

    // console.log(req.paramList);
    // 之后可删除
    // 内容格式由前端来处理，不满足条件不该来到后端
    if (!username || !password) {
        return res.send({
            err: 1,
            msg: "用户名和密码是必传参数"
        })
    };

    open({
        collectionName: "user"
    }).then(({
        collection,
        client
    }) => {
        collection.find({
            username
        }).toArray((err, data) => {
            if (err) {
                client.close();
                res.send({
                    err: 1,
                    msg: "登录超时，请重试"
                })
            } else {
                if (data.length) {
                    if (bcrypt.compareSync(password, data[0].password)) {
                        client.close();
                        delete data[0].username;
                        delete data[0].password;
                        data[0].token = jwt.sign(username, data[0]._id);
                        res.send({
                            err: 0,
                            msg: "登录成功",
                            data: data[0]
                        })
                    } else {
                        client.close();
                        res.send({
                            err: 1,
                            msg: "密码错误，请重试"
                        })
                    }
                } else {
                    client.close();
                    res.send({
                        err: 1,
                        msg: "用户不存在"
                    })
                }
            }
        })
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
});

module.exports = router;