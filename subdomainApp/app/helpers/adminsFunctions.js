/**
 * Created by Mario on 04.01.2017.
 */
var express = require('express');
var app = express();

var bcrypt = require('bcrypt-nodejs');
var functions = require('../../../functions');
var config = require('../../../config');

app.set('models', require('../../../app/models/home.js'));
var Employee = app.get('models').employee;

module.exports = {
    getCurrentLoggedEmployee: function (req, res, subdomain) {
        Employee.find({
            where: ['subdomain = ?', subdomain],
            attributes: {exclude: ['password']}
        }).then(function (employee) {
            if (employee) res.json({success: true, employee: employee});
            else res.json({success: false, message: "Nie znaleziono subdomeny"});
        });
    },

    uploadAvatar: function (req, res, subdomain) {
        Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
            if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
            else {
                var file = req.files[Object.keys(req.files)[0]];

                var filename = file.path.split('\\');
                filename = filename[filename.length - 1];
                var dir = '/public/' + filename;
                res.json({success: true, path: dir});
            }
        });
    },

    uploadTimetable: function (req, res,subdomain) {
        Employee.find({where: ["subdomain = ?", subdomain], attributes: ['id']}).then(function (employee) {
            if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
            else {
                var file = req.files[Object.keys(req.files)[0]];
                var filename = file.path.split('\\');
                filename = filename[filename.length - 1];
                var dir = '/public/' + filename;

                if (functions.saveTimetable(dir, employee.id)) res.json({success: true, message: "Zapisano plan."});
                else res.json({success: false, message: "Plan nie został zapisany."});
                //res.json({success: true, path: dir});
            }
        });
    },

    updateEmployee: function (req, res, subdomain, employeeObject) {
        Employee.find({where: ["subdomain = ?", subdomain]}).then(function (employee) {
            if (!employee) res.json({success: false, message: "Nie znaleziono subdomeny"});
            else {
                var newExt;
                var oldExt;

                if (employee.avatarPath) oldExt = employee.avatarPath.split('.')[1];
                if (employeeObject.avatarPath) {
                    newExt = employeeObject.avatarPath.split('.')[1];
                    employeeObject.avatarPath = functions.saveAvatar(employee.avatarPath, employeeObject.avatarPath, employee.id, oldExt == newExt);
                }


                Object.keys(employeeObject).forEach(function (element) {
                    employee[element] = employeeObject[element];
                });

                if (employeeObject.password) hashAndUpdateEmployee(req, res, employee, employeeObject);
                else updateEmployee(req, res, employee, employeeObject);
            }
        });
    }
};

function hashAndUpdateEmployee(req, res, employee, employeeObject) {
    if (isPasswordLengthValid(employeeObject.password)) {
        bcrypt.hash(employeeObject.password, null, null, function (err, hash) {
            employee.password = hash;
            employee.save({fields: Object.keys(employeeObject)}).then(function () {
                res.json({success: true, message: "Pracownik zmodyfikowany"});
            });
        });
    } else res.json({
        success: false,
        message: "Hasło musi się składać z minimum " + config.passwordLengthRequired + " znaków"
    });
};

function updateEmployee(req, res, employee, employeeObject) {
    employee.save({fields: Object.keys(employeeObject)}).then(function () {
        res.json({success: true, message: "Pracownik zmodyfikowany"});
    });
};

function isPasswordLengthValid(password) {
    if (password && password.length >= config.passwordLengthRequired) return true;
    else return false;
};
