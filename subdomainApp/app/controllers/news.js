/**
 * Created by Mario on 04.01.2017.
 */
var express = require('express');
var router = express.Router();
var app = express();

var functions = require('../../../functions');
var news = require('../helpers/newsFunctions');

app.set('models', require('../../../app/models/home.js'));
var Employee = app.get('models').employee;

router.post('/list', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else {
            var page = req.body.page;
            var limit = parseInt(req.body.limit);

            (page && limit) ? news.getListNewsWithPagination(req, res, employee.id, page, limit) : news.getListNewsWithoutPagination(req, res, employee.id)
        }
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
            var newsObject = {
                id: req.body.id,
                employeeId: employee.id,
                title: req.body.title,
                description: req.body.description,
                date: functions.getDateTime()
            };

            (newsObject.id) ? news.updateNews(req, res, newsObject) : news.addNews(req, res, newsObject);
        }
    });
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else (id) ? news.deleteNews(req, res, employee.id, id) : res.json({success: false, message: "Nie podano ID artykułu."})
    });
});

module.exports = router;