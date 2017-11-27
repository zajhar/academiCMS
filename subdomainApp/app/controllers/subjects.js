/**
 * Created by Mario on 07.01.2017.
 */
var express = require('express');
var router = express.Router();
var app = express();

var multipart = require('connect-multiparty');
var path = require('path');
var functions = require('../../../functions');
var subjects = require('../helpers/subjectsFunctions');
var config = require('../../../config');

app.set('models', require('../../../app/models/home.js'));
var Employee = app.get('models').employee;

router.post('/list', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else subjects.getSubjectsList(req, res, employee.id);
    });
});

router.post('/studiesList', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else subjects.getStudiesList(req, res);
    });
});

router.use(function (req, res, next) {
    functions.checkLogin(req, res, next, 'employee-access-token');
});

router.post('/uploadFiles', multipart({
    uploadDir: path.join(__dirname, '../../../public/')
}), function (req, res) {

    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else subjects.uploadFiles(req, res);
    });
});

router.post('/saveFiles', function (req, res) {
    var id = req.body.id;
    var fileArray = req.body.files;
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else subjects.saveFiles(req, res, employee.id, id, fileArray);
    });
});

router.post('/fileList', function (req, res) {
    var id = req.body.id;
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else subjects.fileList(req, res, employee.id, id);
    });
});

router.post('/updateFile', function(req, res){
    var id = req.body.id;
    var subdomain = req.vhost[0] + "." + req.vhost[1];
    var name = req.body.name;

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else subjects.updateFile(req, res, name, employee.id, id);
    });
});

router.post('/deleteFile', function(req, res) {
    var id = req.body.id;
    var subjectId = req.body.subjectId;
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else subjects.deleteFile(req, res, employee.id, subjectId, id);
    });
});

router.post('/add', function (req, res) {
    var subdomain = req.vhost[0] + "." + req.vhost[1];

    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else {
            var subjectObject = {
                id: req.body.id,
                employeeId: employee.id,
                name: req.body.name,
                studiesId: req.body.studiesId
            };

            subjectObject.path = '/' + subjectObject.employeeId + '/' + subjectObject.name;
            subjectObject.path = subjectObject.path.replace(/ /g, '_');
            if(subjectObject.studiesId) {
                var studies;
                (subjectObject.studiesId == 1) ? studies = "s" : studies = "ns";
                subjectObject.path += "_" + studies;
            }


            (subjectObject.id) ? subjects.updateSubject(req, res, subjectObject) : subjects.addSubject(req, res, subjectObject);
        }
    });
});

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;

    var subdomain = req.vhost[0] + "." + req.vhost[1];
    Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
        if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
        else (id) ? subjects.deleteSubject(req, res, employee.id, id) : res.json({success: false, message: "Nie zapewniono ID."});
    });
});

module.exports = router;