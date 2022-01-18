var express = require('express');
var app = express();

/* MySQL 연결 */
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '111111',
	database: 'project2'
});

app.set('port', process.env.PORT || 3000);	// 포트 (3000)
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/test', (req, res) => {
	connection.query('SELECT * FROM login', (error, rows) => {
		if (error) throw error;
		console.log('Info is ', rows);
		res.send(rows);
	});
});

app.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});