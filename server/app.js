const cors = require('cors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
// 	redisStorage = require('connect-redis')(session),
// 	redis = require('redis');

const sql = require('./models/db');
sql.query('SET SESSION wait_timeout = 604800');

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

app.use(express.json());
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST', 'PUT'],
		credentials: true,
	}),
);

app.use(
	session({
		// store: new redisStorage({
		// 	client: redis.createClient(),
		// 	ttl: 260,
		// }),
		secret: 'piskudash3bat',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60 * 60 * 1,
			secure: true,
		},
	}),
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.use('/api/orders', orderRouter);
app.use('/api/gallery', express.static(path.join(__dirname, 'public/static/gallery')));
app.get('/api/images/get', (req, res) => {
	fs.readdir(path.join(__dirname, 'public/static/gallery'), (err, data) => {
		if (err) {
			return res.status(400).json({ error: err });
		}

		res.status(200).json({ images: data });
	});
});

app.post('/api/auth', (req, res) => {
	const { login, password } = req.body;

	console.log(login, password);

	sql.query(`SELECT * FROM admins WHERE login = (?)`, login, (err, result) => {
		if (err) {
			res.status(200).json({ errs: err });
			console.log(err);
			return;
		}

		if (result.length) {
			if (password === result[0].password) {
				req.session.user = result;

				console.log('tr', req.session.user);
				res.json({ message: 'Вы успешно авторизировалсь!' });
			} else {
				res.status(200).json({ errs: 'Ошибка: Неверный пароль!' });
			}
		} else {
			res.status(200).json({ errs: 'Ошибка: Аккаунт не найден в БД!' });
		}
	});
});

app.get('/api/auth', (req, res) => {
	console.log('dick:', req.session.user);
	console.log('nodick:', req.session);
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});

//

app.use((req, res, next) => {
	res.status(404).send('Not Found');
});

app.listen(PORT, () => {
	console.log(`Server was started on ${PORT}`);
});
