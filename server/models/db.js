const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

module.exports = mysql.createConnection({
	database: dbConfig.DATABASE,
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
});

// con.connect((err) => {
// 	if (err) throw error;
// 	console.log('успешно соединено с базой данных');
// });
