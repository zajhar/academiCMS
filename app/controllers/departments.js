/**
 * Created by Mario on 30.12.2016.
 */
var express = require('express');
var router = express.Router();

var functions = require('../../functions');
var departments = require('../helpers/departmentsFunctions');

module.exports = router;

router.post('/list', function (req, res) {
    var page = req.body.page;
    var limit = parseInt(req.body.limit);

    (page && limit) ? departments.getDepartmentsListWithPagination(req, res, page, limit) : departments.getDepartmentsListWithoutPagination(req, res);
});

router.use(function (req, res, next) {
    functions.checkLogin(req, res, next, 'admin-access-token');
});

router.post('/add', function (req, res) {
    var departmentObject = {
        id: req.body.id,
        name: req.body.name,
        shortcut: req.body.shortcut
    };

    (departmentObject.id) ? departments.updateDepartment(req, res, departmentObject) : departments.addDepartment(req, res, departmentObject);
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;

    (id) ? departments.deleteDepartment(req, res, id) : res.json({success: false, message: "Nie zapewniono ID."});
});