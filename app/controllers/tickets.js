/**
 * Created by Mario on 04.01.2017.
 */
var express = require('express');
var router = express.Router();

var functions = require('../../functions');
var tickets = require('../helpers/ticketsFunctions');

router.get('/delete/:id', function (req, res) {
    var id = req.params.id;

    (id) ? tickets.deleteTicket(req, res, id) : res.json({success: false, message: "Nie podano ID ticketu."})
});

router.post('/list', function (req, res) {
    var page = req.body.page;
    var limit = parseInt(req.body.limit);

    (page && limit) ? tickets.getTicketListWithPagination(req, res, page, limit) : tickets.getTicketListWithoutPagination(req, res);
});

module.exports = router;