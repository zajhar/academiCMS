/**
 * Created by Mario on 03.01.2017.
 */
var express = require('express');
var app = express();

var functions = require('../../functions');

var bcrypt = require('bcrypt-nodejs');
var config = require('../../config');

app.set('models', require('../models/home.js'));
var Admin = app.get('models').admin;

module.exports = {
    getListWithPagination: function (req, res, page, limit) {
        Admin.findAndCountAll({
            where: ['id >= ?', 0],
            attributes: ['id', 'username', 'email', 'last_logged'],
            offset: limit * (page - 1),
            limit: limit
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getListWithoutPagination: function (req, res) {
        Admin.findAndCountAll({
            where: ['id >= ?', 0],
            attributes: ['id', 'username', 'email', 'last_logged']
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getCurrentLoggedAdmin: function (req, res, username) {
        Admin.find({
            where: ['username = ?', username],
            attributes: ['username', 'email', 'last_logged']
        }).then(function (admin) {
            if (admin) res.json({success: true, admin: admin});
            else res.json({success: false, message: "Nie znaleziono admina obecnie zalogowanego"});
        });
    },

    updateAdmin: function (req, res, adminObject) {
        Admin.find({where: ["id = ?", adminObject.id]}).then(function (admin) {
            if (!admin) res.json({success: false, message: "Nie znaleziono admina"});
            else {
                Object.keys(adminObject).forEach(function (element) {
                    admin[element] = adminObject[element];
                });

                (adminObject.password) ? hashAndUpdateAdmin(req, res, admin, adminObject) : updateAdmin(req, res, admin, adminObject);
            }
        });
    },

    addAdmin: function (req, res, adminObject) {
        if (functions.checkAllAtributesWithPassword(adminObject)) {
            bcrypt.hash(adminObject.password, null, null, function (err, hash) {
                adminObject.password = hash;
                var admin = Admin.build(adminObject);
                res.json({success: true, message: "Dodano Admina"});
                admin.save();
            });
        } else res.json({
            success: false,
            message: "Nie wypełniono wszystkich pól oraz hasło musi posiadać co najmniej " + config.passwordLengthRequired + " znaków."
        });
    },

    deleteAdmin: function (req, res, id) {
        Admin.find({where: ["id = ?", id]}).then(function (admin) {
            if (admin) {
                admin.destroy().then(function () {
                    res.json({success: true, message: "Usunięto Admina."});
                });
            }
            else res.json({success: false, message: "Admin nie istnieje."});
        });
    }
};

function hashAndUpdateAdmin(req, res, admin, adminObject) {
    if (isPasswordLengthValid(adminObject.password)) {
        bcrypt.hash(adminObject.password, null, null, function (err, hash) {
            admin.password = hash;
            admin.save({fields: Object.keys(adminObject)}).then(function () {
                res.json({success: true, message: "Admin zmodyfikowany"});
            });
        });
    } else res.json({
        success: false,
        message: "Hasło musi się składać z minimum " + config.passwordLengthRequired + " znaków"
    });
};

function updateAdmin(req, res, admin, adminObject) {
    admin.save({fields: Object.keys(adminObject)}).then(function () {
        res.json({success: true, message: "Admin zmodyfikowany"});
    });
};

function isPasswordLengthValid(password) {
    if (password && password.length >= config.passwordLengthRequired) return true;
    else return false;
};