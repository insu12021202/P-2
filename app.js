const express = require('express');
const app = express();

/* MySQL 연결 */
const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: 'localhosconstt',
	user: 'root',
	password: '111111',
	database: 'project2',
	port: 3307
});

app.set('port', process.env.PORT || 3000);	// 포트 (3000)
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
	console.log('Express server listening on port ' + app.get('port'));
});