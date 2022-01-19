const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const crypto = require('crypto');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

/* MySQL 연결 */
const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: 'localhosconstt',
	user: 'root',
	password: '111111',
	database: 'project2',
	multipleStatements: true
});
// connection.connect((err) => {
// 	if (!err) {
// 		console.log("Connected");
// 	} else {
// 		console.log("Connection Failed");
// 	}
// });

app.set('port', process.env.PORT || 3000);	// 포트 (3000)
app.use(express.static('public'));

// app.use(session({
// 	key: 'session_cookie_name',
// 	secret: 'session_cookie_secret',
// 	store: new MySQLStore({
// 		host: 'localhost',
// 		port: 3306,
// 		user: 'root',
// 		database: 'project2'
// 	}),
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		maxAge: 1000 * 60 * 60 * 24,
// 	}
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));
// app.use(express.static('public'));
// app.use('view engine', 'ejs');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});