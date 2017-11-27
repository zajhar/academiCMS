/**
 * Created by Mario on 03.01.2017.
 */
var express = require('express');
var router = express.Router();

var path = require('path');
var jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
var functions = require('../../../functions');
var config = require('../../../config');

router.get('/', function (req, res) {
    functions.check(req, res, 'employee-access-token');
});

module.exports = router;