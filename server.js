const express = require('express');
const app = express();
const mysql = require('mysql');

//정적 폴더 설정
app.use(express.static('frontend'));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dudlstn908!',
    database: 'p-2_db'
})

con.connect(function(err) {
    if(err) throw err;
    console.log('DB Connected');
})

app.get('/', (req, res)=> {
    res.sendFile('')
})

app.listen(8000, function(){
    console.log('Listening on 8000')
});