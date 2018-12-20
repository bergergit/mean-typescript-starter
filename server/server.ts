import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as methodOverride from 'method-override';
import { api } from './api/routes';

/**
 * MONGO DB INITIALIZATION
 */
let connection = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/contentgenerator", { useNewUrlParser: true }).then(
    () => { console.info(`${new Date()} - Connected to MongoDB: ${process.env.MONGODB_URI}`); },
    err => { console.error('MongoDB Connection Error. Please make sure that', process.env.MONGODB_URI, 'is running.'); }
);

/**
 * APP INITIALIZATION
 */
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

/**
 * APP FILES
 */
app.use('/api', api);

/**
 * SERVER INITIALIZATION
 */
const port = process.env.PORT || '8083';
app.set('port', port);
app.listen(port, () => console.log(`Server running on localhost:${port}`));
