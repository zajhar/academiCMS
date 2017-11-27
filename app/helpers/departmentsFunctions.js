/**
 * Created by Mario on 03.01.2017.
 */
var express = require('express');
var app = express();

var functions = require('../../functions');

app.set('models', require('../models/home.js'));
var Department = app.get('models').department;

module.exports = {
    getDepartmentsListWithPagination: function (req, res, page, limit) {
        Department.findAndCountAll({
            where: ['id >= ?', 0],
            offset: limit * (page - 1),
            limit: limit
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getDepartmentsListWithoutPagination: function (req, res) {
        Department.findAndCountAll({
            where: ['id >= ?', 0]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    updateDepartment: function (req, res, departmentObject) {
        Department.find({where: ["id = ?", departmentObject.id]}).then(function (department) {
            if (!department) res.json({success: false, message: "Nie znaleziono wydziału"});
            else {
                Object.keys(departmentObject).forEach(function (element) {
                    department[element] = departmentObject[element];
                });

                department.save({fields: Object.keys(departmentObject)}).then(function () {
                    res.json({success: true, message: "Wydział zmodyfikowany"});
                });
            }
        });
    },

    addDepartment: function (req, res, departmentObject) {
        if (functions.checkAllAtributes(departmentObject)) {
            var department = Department.build(departmentObject);
            res.json({success: true, message: "Dodano Wydział"});
            department.save();
        }
        else res.json({success: false, message: "Nie wypełniono wszystkich pól."});
    },

    deleteDepartment: function (req, res, id) {
        Department.find({where: ["id = ?", id]}).then(function (department) {
            if (department) {
                department.destroy().then(function () {
                    res.json({success: true, message: "Usunięto Wydział."});
                });
            }
            else res.json({success: false, message: "Wydział nie istnieje."});
        });
    }
};