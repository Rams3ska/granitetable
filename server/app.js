const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const sql = require('./models/db');

const orderRouter = require('./routes/orderRouter');

const app = express();
const PORT = 5000;

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('X-Content-Type-Options', 'nosniff');
	res.header('X-XSS-Protection', '1; mode=block');
	res.header('X-Frame-Options', 'DENY');
	res.header('Strict-Transport-Security', 'max-age=expireTime');
	next();
});

app.use(cors({ allowedHeaders: false }));
app.use(express.json());

// routes

app.use('/api/orders', orderRouter);
//

app.use((req, res, next) => {
	res.status(404).send('Not Found');
});

app.listen(PORT, () => {
	console.log(`Server was started on ${PORT}`);
});
