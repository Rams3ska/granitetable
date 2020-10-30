const sql = require('../models/db');
const { validationResult } = require('express-validator');

exports.addOrder = (req, res) => {
	const vErrors = validationResult(req);

	if (vErrors.errors.length > 0) {
		return res.status(422).json({ message: 'ОШИБКА ВАЛИДАЦИИ, ВВЕДИТЕ КОРРЕКТНЫЕ ЗНАЧЕНИЯ.', error: true });
	}

	sql.query('SELECT * FROM orders WHERE phone LIKE ? or email LIKE ?', [req.body.phone, req.body.email], (err, result) => {
		if (err) {
			console.log('sql error:', err);
			res.status(422).json({ message: 'ОШИБКА! ПРОВЕРЬТЕ ВВЕДЕННЫЕ ВАМИ ДАННЫЕ.', error: true });
			return;
		}

		if (result.length) {
			res.status(200).json({ message: 'ЗАЯВКА С ТАКИМ НОМЕРОМ/ПОЧТОЙ УЖЕ СУЩЕСТВУЕТ!', error: true });
			return;
		}

		sql.query('INSERT INTO orders SET ?', req.body, (err, result) => {
			if (err) {
				console.log('sql error:', err);
				res.status(400).json({ message: 'ОШИБКА! ПРОВЕРЬТЕ ВВЕДЕННЫЕ ВАМИ ДАННЫЕ.', error: true });
				return;
			}

			res.status(201).json({ message: 'ВАША ЗАЯВКА БЫЛА УСПЕШНО ОТПРАВЛЕНА!', error: false });
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
