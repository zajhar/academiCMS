/**
 * Created by Mario on 27.12.2016.
 */
var express = require('express');
var router = express.Router();

var jwtDecode = require('jwt-decode');
var functions = require('../../functions');
var admins = require('../helpers/adminsFunctions');

var diskspace = require('diskspace');
var cpuStat = require('cpu-stat');
var os = require('os');

router.get('/', function (req, res) {
    functions.check(req, res, 'admin-access-token');
});

router.use(function (req, res, next) {
    functions.checkLogin(req, res, next, 'admin-access-token');
});

router.get('/usage', function (req, res) {
    cpuStat.usagePercent(function (err, percent, seconds) {
        //diskspace.check('C', function (err, total, free, status) {
        res.json({
            cpuPercent: parseInt(percent),
            memory: {
                used: parseInt((os.totalmem() - os.freemem()) / 1024 / 1024),
                total: parseInt(os.totalmem() / 1024 / 1024)
            }
        });
        //});
    });
});

router.get('/current', function (req, res) {
    var adminToken = req.cookies['admin-access-token'];

    admins.getCurrentLoggedAdmin(req, res, jwtDecode(adminToken).username);
});

router.post('/list', function (req, res) {
    var page = req.body.page;
    var limit = parseInt(req.body.limit);

    (page && limit) ? admins.getListWithPagination(req, res, page, limit) : admins.getListWithoutPagination(req, res);

});

router.post('/add', function (req, res) {
    var adminObject = {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    (adminObject.id) ? admins.updateAdmin(req, res, adminObject) : admins.addAdmin(req, res, adminObject);
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;

    (id) ? admins.deleteAdmin(req, res, id) : res.json({success: false, message: "Nie zapewniono ID."});
});

module.exports = router;