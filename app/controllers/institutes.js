/**
 * Created by Mario on 30.12.2016.
 */
var express = require('express');
var router = express.Router();

var config = require('../../config');
var functions = require('../../functions');
var institutes = require('../helpers/institutesFunctions');

module.exports = router;

router.post('/list', function (req, res) {
    var page = req.body.page;
    var limit = parseInt(req.body.limit);

    (page && limit) ? institutes.getInstitutesListWithPagination(req, res, page, limit) : institutes.getInstitutesListWithoutPagination(req, res);
});

router.post('/about', function (req, res) {
    var id = req.body.id;

    (id) ? institutes.aboutInstitute(req, res, id) : res.json({success: true, message: "Nie zapewniono ID."});
});

router.use(function (req, res, next) {
    functions.checkLogin(req, res, next, 'admin-access-token');
});

router.post('/add', function (req, res) {
    var instituteObject = {
        id: req.body.id,
        name: req.body.name,
        departmentId: req.body.departmentId
    };

    (instituteObject.id) ? institutes.updateInstitute(req, res, instituteObject) : institutes.addInstitute(req, res, instituteObject);
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;

    (id) ? institutes.deleteInstitute(req, res, id) : res.json({success: false, message: "Nie zapewniono ID."});
});