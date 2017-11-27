/**
 * Created by Mario on 19.12.2016.
 */
var express = require('express');
var router = express.Router();
var app = express();

var path = require('path');
var multipart = require('connect-multiparty');
var fs = require('fs');

var functions = require('../../functions');
var employees = require('../helpers/employeesFunctions');

app.set('models', require('../models/home.js'));

// app.use(multipart({
//     uploadDir: config.tmp
// }));

router.post('/search', function (req, res) {
    var phrase = req.body.phrase;
    var page = req.body.page;
    var limit = req.body.limit;
    // var search = functions.joinArray(searchJson.split(' '));//functions.searchString(searchJson.split(' '));

    if (phrase) phrase = functions.joinArray(req.body.phrase.split(' '));
    else phrase = [];

    switch (phrase.length) {
        case 1: {
            (page && limit) ? employees.searchOneWithPagination(req, res, phrase, page, limit) : employees.searchOneWithoutPagination(req, res, phrase);
            break;
        }
        case 2: {
            (page && limit) ? employees.searchTwoWithPagination(req, res, phrase, page, limit) : employees.searchTwoWithoutPagination(req, res, phrase);
            break;
        }
        default: {
            res.json({success: false, message: "Nie wpisano frazy"});
        }
    }
    // if(phrase.length == 1)
    //     (page && limit) ? employees.searchOneWithPagination(req, res, phrase, page, limit) : employees.searchOneWithoutPagination(req, res, phrase);
    // else
    //     (page && limit) ? employees.searchTwoWithPagination(req, res, phrase, page, limit) : employees.searchTwoWithoutPagination(req, res, phrase);
    // if (page > 0 && limit > 0) {
    //
    // }
    // else res.json({success: false, message: "Strona i limit muszą być większe od 0."});
});

router.post('/list', function (req, res) {
    var page = req.body.page;
    var limit = parseInt(req.body.limit);

    (page && limit) ? employees.getEmployeesListWithPagination(req, res, page, limit) : employees.getEmployeesListWithoutPagination(req, res);
});

router.use(function (req, res, next) {
    functions.checkLogin(req, res, next, 'admin-access-token');
});

router.post('/uploadAvatar', multipart({
    uploadDir: path.join(__dirname, '../../public/')
}), function (req, res) {
    var file = req.files[Object.keys(req.files)[0]];
    var filename = file.path.split('\\');
    filename = filename[filename.length - 1];
    var dir = '/public/' + filename;
    res.json({success: true, path: dir});
});

// router.post('/getAvatarPath', function(req,res) {
//     var id = req.body.id;
//     employees.getAvatarPath(req,res,id);
// });

router.post('/add', function (req, res) {
    var employeeObject = {
        id: req.body.id,
        academicTitle: req.body.academicTitle,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        function: req.body.function,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        building: req.body.building,
        room: req.body.room,
        tutorship: req.body.tutorship,
        mainPageInfo: req.body.mainPageInfo,
        subdomain: req.body.subdomain,
        password: req.body.password,
        departmentId: req.body.department.id,
        avatarPath: req.body.avatarPath
    };
    if (employeeObject.id) employees.updateEmployee(req, res, employeeObject);
    else employees.hasDuplicates(employeeObject).then(function (isDuplicate) {
        (isDuplicate) ? res.json({
                success: false,
                message: "Istnieje pracownik o podanej subdomenie"
            }) : employees.addEmployee(req, res, employeeObject);
    });
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;

    (id) ? employees.deleteEmployee(req, res, id) : res.json({success: false, message: "Nie zapewniono ID."});
});

module.exports = router;