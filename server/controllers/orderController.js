const sql = require('../models/db');

exports.addOrder = (req, res) => {
	sql.query('SELECT * FROM orders WHERE phone LIKE ? or email LIKE ?', [req.body.phone, req.body.email], (err, result) => {
		if (err) {
			console.log('sql error:', err);
			res.status(400).json({ message: 'ОШИБКА! ПРОВЕРЬТЕ ВВЕДЕННЫЕ ВАМИ ДАННЫЕ.' });
			return;
		}

		if (result.length) {
			res.status(200).json({ message: 'ЗАЯВКА С ТАКИМ НОМЕРОМ/ПОЧТОЙ УЖЕ СУЩЕСТВУЕТ!' });
			return;
		}

		sql.query('INSERT INTO orders SET ?', req.body, (err, result) => {
			if (err) {
				console.log('sql error:', err);
				res.status(400).json({ message: 'ОШИБКА! ПРОВЕРЬТЕ ВВЕДЕННЫЕ ВАМИ ДАННЫЕ.' });
				return;
			}

			res.status(201).json({ message: 'ВАША ЗАЯВКА БЫЛА УСПЕШНО ОТПРАВЛЕНА!' });
		});
	});
};

exports.approveOrder = (req, res) => {};

exports.getOrders = (req, res) => {
	if (!req.body.token) return;

	sql.query('SELECT * FROM orders', (err, result) => {
		if (err) {
			console.log('Error: ', err);
			res.status(404).json({ message: 'Ашыбка' });
			return;
		}

		res.status(200).json(result);
	});
};
