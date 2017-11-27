/**
 * Created by Mario on 04.01.2017.
 */
var express = require('express');
var router = express.Router();
var app = express();

var functions = require('../../../functions');
var tickets = require('../helpers/ticketsFunctions');

app.set('models', require('../../../app/models/home.js'));
var Employee = app.get('models').employee;

router.use(function (req, res, next) {
    functions.checkLogin(req, res, next, 'employee-access-token');
});

router.post('/add', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else {
            var ticketObject = {
                id: req.body.id,
                employeeId: employee.id,
                status: false,
                description: req.body.description,
                date: functions.getDateTime()
            };

            (ticketObject.id) ? tickets.updateTicket(req, res, ticketObject) : tickets.addTicket(req, res, ticketObject);
        }
    });
});

router.post('/list', function (req, res) {
    var page = req.body.page;
    var limit = parseInt(req.body.limit);

    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else (page && limit) ? tickets.getTicketListWithPagination(req, res, employee.id, page, limit) : tickets.getTicketListWithoutPagination(req, res, employee.id);
    });
});

router.post('/changeStatus', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else {
            var ticketObject = {
                id: req.body.id,
                employeeId: employee.id,
                status: true
            };

            tickets.updateTicket(req, res, ticketObject);
        }
    });
});

module.exports = router;