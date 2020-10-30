const { check } = require('express-validator');

exports.addOrder = [
	//
	check('name', 'surname')
		.matches(/^[a-zA-Zа-яА-Я]{1,32}$/)
		.notEmpty()
		.exists(),
	check('email').isEmail().notEmpty().exists().normalizeEmail(),
	check('phone')
		.isLength({ min: 11, max: 12 })
		.matches(/^((\+7|7|8)+([0-9]){10})$|\b\d{3}[-.]?\d{3}[-.]?\d{4}$/)
		.notEmpty()
		.exists(),
	check('comment').exists(),
	//
];
