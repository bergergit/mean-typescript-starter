"use strict";
exports.__esModule = true;
// equivalent of older: const express = require('express')
var express_1 = require("express");
var bodyParser = require("body-parser");
var mongoose_1 = require("mongoose");
var method_override_1 = require("method-override");
var cors_1 = require("cors");
var routes_1 = require("./api/routes");
/**
 * MONGO DB INITIALIZATION
 */
mongoose_1["default"].connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test");
var monDb = mongoose_1["default"].connection;
monDb.on('error', function () {
    console.error('MongoDB Connection Error. Please make sure that', process.env.MONGODB_URI, 'is running.');
});
monDb.once('open', function callback() {
    console.info('Connected to MongoDB:', process.env.MONGODB_URI);
});
/**
 * APP INITIALIZATION
 */
var app = express_1["default"]();
app.use(bodyParser.json());
var distDir = __dirname + "/dist/";
app.use(express_1["default"].static(distDir));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(method_override_1["default"]('X-HTTP-Method-Override'));
app.use(cors_1["default"]());
/**
 * APP FILES
 */
app.use('/', routes_1.routes);
/**
 * SERVER INITIALIZATION
 */
var port = process.env.PORT || '8083';
app.set('port', port);
app.listen(port, function () { return console.log("Server running on localhost:" + port); });
