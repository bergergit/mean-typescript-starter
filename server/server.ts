import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import * as methodOverride from 'method-override';
import { routes } from './api/routes';

/**
 * MONGO DB INITIALIZATION
 */
//connect to mongoose
let connection = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost:27017/test", { useNewUrlParser: true });
connection.on('error', function () {
    console.error('MongoDB Connection Error. Please make sure that', process.env.MONGODB_URI, 'is running.');
});
connection.once('open', function callback() {
    console.info('Connected to MongoDB:', process.env.MONGODB_URI);
});

/**
 * APP INITIALIZATION
 */
const app = express();
app.use(bodyParser.json());
let distDir = __dirname + "/dist/";
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
