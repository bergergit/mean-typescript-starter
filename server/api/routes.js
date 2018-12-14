"use strict";
exports.__esModule = true;
/**
 * API ROUTES
 */
var express = require("express");
exports.routes = express.Router();
exports.routes.get('/', function (req, res) {
    res.send({ hello: 'world' });
});
exports.routes.get('/users', function (req, res) {
    res.send([]);
});
exports.routes.post('/users', function (req, res) {
    res.send({ body: req.body });
});
