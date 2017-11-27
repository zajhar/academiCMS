/**
 * Created by Mario on 03.01.2017.
 */
var express = require('express');
var app = express();

var functions = require('../../functions');

app.set('models', require('../models/home.js'));
var Institute = app.get('models').institute;
var Department = app.get('models').department;

module.exports = {
    getInstitutesListWithPagination: function (req, res, page, limit) {
        Institute.findAndCountAll({
            where: ['id >= ?', 0],
            attributes: ['id'],
            offset: limit * (page - 1),
            limit: limit
        }).then(function (institutes) {
            res.json({success: true, results: institutes.count, list: institutes.rows});
        });
    },

    getInstitutesListWithoutPagination: function (req, res) {
        Institute.findAndCountAll({
            where: ['id >= ?', 0],
            attributes: ['id']
        }).then(function (institutes) {
            res.json({success: true, results: institutes.count, list: institutes.rows});
        });
    },

    aboutInstitute: function (req, res, id) {
        Institute.belongsTo(Department);

        Institute.find({
            where: ['institute.id >= ?', id],
            attributes: ['id', 'instituteName'],
            include: [Department]
        }).then(function (json) {
            res.json({success: true, institute: json});
        });
    },

    updateInstitute: function (req, res, instituteObject) {
        Institute.find({where: ["id = ?", instituteObject.id]}).then(function (institute) {
            if (!institute) res.json({success: false, message: "Nie znaleziono instytutu"});
            else {
                Object.keys(instituteObject).forEach(function (element) {
                    institute[element] = instituteObject[element];
                });

                institute.save({fields: Object.keys(instituteObject)}).then(function () {
                    res.json({success: true, message: "Instytut zmodyfikowany"});
                });
            }
        });
    },

    addInstitute: function (req, res, instituteObject) {
        if (functions.checkAllAtributes(instituteObject)) {
            var institute = Institute.build(instituteObject);
            res.json({success: true, message: "Dodano Instytut"});
            institute.save();
        }
        else res.json({success: false, message: "Nie wypełniono wszystkich pól."});
    },

    deleteInstitute: function (req, res, id) {
        Institute.find({where: ["id = ?", id]}).then(function (institute) {
            if (institute) {
                institute.destroy().then(function () {
                    res.json({success: true, message: "Usunięto Instytut."});
                });
            }
            else res.json({success: false, message: "Instytut nie istnieje."});
        });
    }
};