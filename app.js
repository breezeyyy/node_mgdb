const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const multer = require("multer");
const initParams = require("./config/global");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// 设置文件上传路径
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.url.includes("reg")) {
            cb(null, path.join(initParams.pathPublic, initParams.pathUpload, initParams.pathUser));
        } else if (req.url.includes("banner")) {
            cb(null, path.join(initParams.pathPublic, initParams.pathUpload, initParams.pathBanner));
        } else {
            cb(null, path.join(initParams.pathPublic, initParams.pathUpload, initParams.pathNews));
        }
    }
});

const upload = multer({
    storage
});
app.use(upload.any());

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/template')));
app.use("/admin", express.static(path.join(__dirname, 'public/admin')));

// 公共参数处理，以及token处理
app.use('/api', require("./utils/param"));

// 路由处理
// 查询数据
app.use('/api/news', require("./routes/api/news"));

app.use('/api/user', require("./routes/api/user"));
app.use('/api/login', require("./routes/api/login"));
app.use('/api/reg', require("./routes/api/reg"));

app.use("/api/delete", require("./routes/api/delete"));
app.use("/api/audit", require("./routes/api/audit"));
app.use("/api/count", require("./routes/api/count"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    if(req.url.includes('/api')){//webApi接口错误
        res.send({
            err:1,
            msg:'不存在的接口名'
        })
    }else if(req.url.includes('/admin')){//服务端Api接口错误
        res.render('error');
    }else{//交还给客户端判断
        res.sendFile(path.join(__dirname, 'public','template', 'index.html'));
    }
});

module.exports = app;
