const router = require('express').Router();

router.use('/', require("./template/home"));
router.use('/home', require("./template/home"));
router.use('/column', require("./template/column"));
router.use('/follow', require("./template/follow"));
router.use('/mydoc', require("./template/mydoc"));
router.use('/article', require("./template/article"));
router.use('/login', require("./template/login"));
router.use('/reg', require("./template/reg"));

module.exports = router;