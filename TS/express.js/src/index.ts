import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import rateLimit from 'express-rate-limit';
const port = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const logger = require('morgan'); // Enabling dev mode
app.use(logger('dev')); // Enabling dev mode

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);


app.use('/', indexRouter);

app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`);
});

export default app;
