/**
 * Created by Mario on 04.01.2017.
 */
var express = require('express');
var app = express();

var functions = require('../../../functions');
app.set('models', require('../../../app/models/home.js'));
var News = app.get('models').news;

module.exports = {
    getListNewsWithPagination: function (req, res, employeeId, page, limit) {
        News.findAndCountAll({
            where: ['employeeID = ?', employeeId],
            offset: limit * (page - 1),
            limit: limit
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getListNewsWithoutPagination: function (req, res, employeeId) {
        News.findAndCountAll({
            where: ['employeeID = ?', employeeId]
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    addNews: function (req, res, newsObject) {
        if (functions.checkAllAtributes(newsObject)) {
            var news = News.build(newsObject);
            res.json({success: true, message: "Dodano artykuł."});
            news.save();
        }
        else res.json({success: false, message: "Nie podano tytułu bądź opisu artykułu."});

    },

    updateNews: function (req, res, newsObject) {
        News.find({where: ["id = ?", newsObject.id]}).then(function (news) {
            if (!news) res.json({success: false, message: "Nie znaleziono artykułu"});
            else {
                Object.keys(newsObject).forEach(function (element) {
                    news[element] = newsObject[element];
                });

                news.save({fields: Object.keys(newsObject)}).then(function () {
                    res.json({success: true, message: "Artykuł zmodyfikowany"});
                });
            }
        });
    },

    deleteNews: function (req, res, employeeId, id) {
        News.find({
            where: {
                $and: {
                    id: id,
                    employeeId: employeeId
                }
            }
        }).then(function (news) {
            if (news) {
                news.destroy().then(function () {
                    res.json({success: true, message: "Usunięto artykuł."});
                });
            }
            else res.json({success: false, message: "Artykuł nie istnieje."});
        });
    }
};