/**
 * Created by Mario on 04.01.2017.
 */
var express = require('express');
var app = express();

var functions = require('../../../functions');

app.set('models', require('../../../app/models/home.js'));
var Ticket = app.get('models').ticket;

module.exports = {
    addTicket: function (req, res, ticketObject) {
        if (functions.checkAllAtributes(ticketObject)) {
            var ticket = Ticket.build(ticketObject);
            res.json({success: true, message: "Dodano ticket."});
            ticket.save();
        }
        else res.json({success: false, message: "Nie podano opisu ticketu."});
    },

    updateTicket: function (req, res, ticketObject) {
        Ticket.find({
            where: {
                $and: {
                    id: ticketObject.id,
                    employeeId: ticketObject.employeeId
                }
            }
        }).then(function (ticket) {
            if (!ticket) res.json({success: false, message: "Nie znaleziono ticketu"});
            else {
                Object.keys(ticketObject).forEach(function (element) {
                    ticket[element] = ticketObject[element];
                });

                ticket.save({fields: Object.keys(ticketObject)}).then(function () {
                    res.json({success: true, message: "Ticket zmodyfikowany"});
                });
            }
        });
    },

    getTicketListWithPagination: function (req, res, employeeId, page, limit) {
        Ticket.findAndCountAll({
            where: ["employeeID = ?", employeeId], offset: limit * (page - 1),
            limit: limit
        }).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    },

    getTicketListWithoutPagination: function (req, res, employeeId) {
        Ticket.findAndCountAll({where: ["employeeID = ?", employeeId]}).then(function (json) {
            res.json({success: true, results: json.count, list: json.rows});
        });
    }
};