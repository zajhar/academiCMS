/**
 * Created by Mario on 09.01.2017.
 */
var express = require('express');
var router = express.Router();
var app = express();

var functions = require('../../../functions');
var statics = require('../helpers/staticsFunctions');
var config = require('../../../config');

app.set('models', require('../../../app/models/home.js'));
var Employee = app.get('models').employee;

router.get('/', function (req, res) {
    var id = req.param('id');
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else statics.getStatic(req, res, id, employee.id);
    });
});

router.post('/list', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else statics.getStaticList(req, res, employee.id);
    });
});

router.use(function (req, res, next) {
    functions.checkLogin(req, res, next, 'employee-access-token');
});

router.post('/add', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else {
            var staticObject = {
                id: req.body.id,
                employeeId: employee.id,
                title: req.body.title,
                content: req.body.content
            };

            (staticObject.id) ? statics.updateStatic(req, res, staticObject) : statics.addStatic(req, res, staticObject);
        }
    });
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;

    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else statics.deleteStatic(req, res, employee.id, id);
    });
});

module.exports = router;