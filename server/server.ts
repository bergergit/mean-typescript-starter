// equivalent of older: const express = require('express')
import express from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import cors from 'cors';
import { routes } from './api/routes'

/**
 * MONGO DB INITIALIZATION
 */
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test");
const monDb = mongoose.connection;

monDb.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that', process.env.MONGODB_URI, 'is running.');
});

monDb.once('open', function callback() {
  console.info('Connected to MongoDB:', process.env.MONGODB_URI);
});

/**
 * APP INITIALIZATION
 */
const app = express();
app.use(bodyParser.json());
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

/**
 * APP FILES
 */
app.use('/', routes);

/**
 * SERVER INITIALIZATION
 */
const port = process.env.PORT || '8083';
app.set('port', port);
app.listen(port, () => console.log(`Server running on localhost:${port}`));