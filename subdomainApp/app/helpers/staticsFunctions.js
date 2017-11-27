/**
 * Created by Mario on 09.01.2017.
 */
var express = require('express');
var app = express();

var functions = require('../../../functions');
var config = require('../../../config');

app.set('models', require('../../../app/models/home.js'));
var Static = app.get('models').static;

module.exports = {
    getStatic: function (req, res, id, employeeId) {
        Static.find({
            where: {
                $and: {
                    id: id,
                    employeeId: employeeId
                }
            }
        }).then(function (static) {
            if (!static) res.json({success: false, message: "Nie znaleziono strony"});
            else {
                res.json({success: true, static: static});
            }
        });
    },

    getStaticList: function (req, res, employeeId) {
        Static.findAndCountAll({
            where: ['employeeId = ?', employeeId]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    addStatic: function (req, res, staticObject) {
        if (functions.checkAllAtributes(staticObject)) {
            var static = Static.build(staticObject);
            res.json({success: true, message: "Dodano stronę."});
            static.save();
        }
        else res.json({success: false, message: "Nie wypełniono wszystkich pól."});
    },

    updateStatic: function (req, res, staticObject) {
        Static.find({
            where: {
                $and: {
                    id: staticObject.id,
                    employeeId: staticObject.employeeId
                }
            }
        }).then(function (static) {
            if (!static) res.json({success: false, message: "Nie znaleziono strony"});
            else {
                Object.keys(staticObject).forEach(function (element) {
                    static[element] = staticObject[element];
                });

                static.save({fields: Object.keys(staticObject)}).then(function () {
                    res.json({success: true, message: "Strona zmodyfikowana"});
                });
            }
        });
    },

    deleteStatic: function (req, res, employeeId, id) {
        Static.find({
            where: {
                $and: {
                    id: id,
                    employeeId: employeeId
                }
            }
        }).then(function (static) {
            if (!static) res.json({success: false, message: "Nie znaleziono strony"});
            else {
                static.destroy().then(function () {
                    res.json({success: true, message: "Usunięto stronę."});
                });
            }
        });
    }
};