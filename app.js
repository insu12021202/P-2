const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const crypto = require('crypto');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

/* session */
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: new MySQLStore({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: '111111',
		database: 'cookie_project2'
	}),
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
	}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static('public'));

/* MySQL 연결 */
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '111111',
	database: 'project2',
	multipleStatements: true
});
connection.connect((err) => {
	if (!err) console.log("Connected");
	else console.log("Connection Failed");
});

const customFields = {
	usernameField: 'uname',
	passwordField: 'pw',
	locationField: 'location',
};

const verifyCallback = (username, password, done) => {
	connection.query('SELECT * FROM login WHERE username = ?', [username], function(error, results, fields) {
		if (error) return done(error);
		if (results.length == 0) return done(null, false);
		const isValid = validPassword(password, results[0].hash, results[0].salt);
		const login = { login_id: results[0].login_id, username: results[0].username, hash: results[0].hash, salt: results[0].salt, location: results[0].location };
		if (isValid) return done(null, user);
		else return done(null, false);
	});
}

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user.login_id));

passport.deserializeUser(function(userId, done) {
	connection.query('SELECT * FROM login WHERE login_id = ?', [userId], function(error, results) {
		done(null, results[0]);
	});
});

function validPassword(password, hash, salt) {
	const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
	return hash === hashVerify;
}

function genPassword(password) {
	const salt = crypto.randomBytes(32).toString('hex');
	const genhash = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
	return {salt: salt, hash: genhash};
}

function isAuth(req, res, next) {
	if (req,isAuthenticated()) next();
	else res.redirect('/notAuthorized');
}

function isAdmin(req, res, next) {
	if (req.isAuthenticated() && req.user.isAdmin == 1) next();
	else res.redirect('/notAuthorizedAdmin');
}

function userExists(req, res, next) {
	connection.query('SELECT * FROM login WHERE username = ?', [req.body.uname], function (error, results, fields) {
		if (error) console.log("Error");
		else if (results.length > 0) res.redirect('/userAlreadyExists');
		else next();
	});
}

app.set('port', process.env.PORT || 3000);	// 포트 (3000)

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/login', passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/login-success'}));

isAuthenticated
req.user

app.post('/sign_up', userExists, (req, res, next) => {
	const saltHash = genPassword(req.body.pw);
	const salt = saltHash.salt;
	const hash = saltHash.hash;

	connection.query('INSERT INTO login(username, hash, salt, isAdmin, location) VALUES(?, ?, ?, 0, ?)', [req.body.uname, hash, salt, req.body.location],
	function (error, results, fields) {
		if (error) console.log(error);
		else console.log("Successfully Entered");
	});
});

app.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});