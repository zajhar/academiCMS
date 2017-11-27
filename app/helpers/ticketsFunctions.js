/**
 * Created by Mario on 04.01.2017.
 */
var express = require('express');
var app = express();

app.set('models', require('../models/home.js'));
var Ticket = app.get('models').ticket;

module.exports = {
    deleteTicket: function (req, res, id) {
        Ticket.destroy({where: ["id = ?", id]}).then(function () {
            res.json({success: true, message: "Usunięto ticket."});
        });
    },

    getTicketListWithPagination: function (req, res, page, limit) {
        Ticket.findAndCountAll({
            where: ["ticket.id > 0"], offset: limit * (page - 1),
            limit: limit
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getTicketListWithoutPagination: function (req, res) {
        Ticket.findAndCountAll({where: ["ticket.id > 0"]}).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    }
};