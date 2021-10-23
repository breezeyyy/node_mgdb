const router = require('express').Router();
const open = require("../../utils/mgdb").open;
const randomName = require("chinese-random-name").generate;
const fs = require("fs");
const initParams = require("../../config/global");
const path = require("path");
const bcrypt = require("../../utils/bcrypt");
const jwt = require("../../utils/jwt");

router.post('/', function (req, res, next) {
    let {
        username,
        password,
        nikename
    } = req.paramList;

    // 之后可删除
    // 内容格式由前端来处理，不满足条件不该来到后端
    (!username || !password) && res.send({
        err: 1,
        msg: "用户名和密码是必传参数"
    });

    // 密码加密
    password = bcrypt.hashSync(password);
    // 随机昵称
    nikename = nikename ? nikename : randomName();
    // 默认头像
    let icon = "/upload/default.jpeg";

    if (req.files && req.files.length) {
        // 磁盘路径头像重命名
        const oldPath = req.files[0].path;
        const newPath = req.files[0].path + path.parse(req.files[0].originalname).ext;
        fs.renameSync(oldPath, newPath);

        // 网络路径
        icon = `/${initParams.pathUpload}/${initParams.pathUser}/${req.files[0].filename}${path.parse(req.files[0].originalname).ext}`;
    }

    open({
        collectionName: "user"
    }).then(({
        collection,
        client
    }) => {
        // 检测当前用户名
        collection.find({
            username
        }).toArray((err, data) => {
            if (err) {
                // 查询失败
                client.close();
                res.send({
                    err: 1,
                    msg: "操作超时，请重试"
                })
            } else if (data.length) {
                // 用户名重复
                // 删除已上传的图片
                icon.includes("default.jpeg") || fs.unlinkSync(`./public${icon}`);
                client.close();
                res.send({
                    err: 1,
                    msg: "该用户已存在"
                })
            } else {
                // 追加用户信息
                collection.insertOne({
                    username,
                    password,
                    follow: 0,
                    fans: 0,
                    nikename,
                    pubArt: 0,
                    priArt: 0,
                    draArt: 0,
                    favorite: 0,
                    icon,
                    // 当前时间戳 - 秒
                    time: Date.now()
                }, (err, result) => {
                    // 追加失败
                    if (err) {
                        client.close();
                        res.send({
                            err: 1,
                            msg: "注册失败，请重试"
                        })
                    } else {
                        // 追加成功
                        client.close();
                        res.send({
                            err: 0,
                            msg: "注册成功",
                            data: {
                                _id: result.insertedId,
                                follow: 0,
                                fans: 0,
                                nikename,
                                pubArt: 0,
                                priArt: 0,
                                draArt: 0,
                                favorite: 0,
                                icon,
                                time: Date.now(),
                                // 返回token（注册并登录）
                                token: jwt.sign(username, result.insertedId)
                            }
                        })
                    }
                })
            }
        })
    }).catch(error => {
        // 捕获错误
        console.log(error);
        res.send(error);
    });

});

module.exports = router;