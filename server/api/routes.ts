/**
 * API ROUTES
 */
import * as express from 'express';

export const api = express();

api.get('/', (req, res) => { 
    res.send({hello: 'world'});
});