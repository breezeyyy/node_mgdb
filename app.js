const createError = require('http-errors');
const express = require('express');
const path = require('path');
const jwt = require("jsonwebtoken");
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
app.use(express.static(path.join(__dirname, 'public/template')));
app.use("/admin", express.static(path.join(__dirname, 'public/admin')));
app.use(express.static(path.join(__dirname, 'public')));

// 路由处理
app.use('/api/*', require("./utils/param"));
app.use('/api/banner', require("./routes/api/banner"));
app.use('/api/column', require("./routes/api/column"));
app.use('/api/follow', require("./routes/api/follow"));
app.use('/api/home', require("./routes/api/home"));
app.use('/api/login', require("./routes/api/login"));
app.use('/api/logout', require("./routes/api/logout"));
app.use('/api/reg', require("./routes/api/reg"));
app.use('/api/user', require("./routes/api/user"));

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
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;