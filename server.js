const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const multer = require('multer');
// const ejs = require('ejs');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontend/images')
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now() + '--' + file.originalname)
    }
})
const upload = multer({storage : fileStorageEngine});

//정적 폴더 설정
app.use(express.static('frontend'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view_engine', 'ejs');
app.set('views', __dirname + '/view');

app.use(session({
    secret: 'sknfienf123',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'dudlstn908!',
        database: 'p-2_db'
    })
}))

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

//별도로 분리한 passport.js에 express와 MySQL을 인자로 넘겨준다.
let passport = require('./frontend/JS/passport.js')(app, con);

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    // failureFlash: true
    })
);

app.get('/logout', (req, res)=> {
    req.session.destroy(() => {
        res.redirect('/');
    });
})
app.get('/searched/우만동', (req, res) => {
    console.log('ㅇ잉');
})

app.post('/searched_item', (req, res) => {
    let location = req.body.location;
    let sql = `select location,deposit,rental_cost,m_fee,image,name,phone_num FROM sale_item LEFT JOIN owner ON sale_item.owner_id = owner.idowner WHERE location='${location}'`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        //만약 해당 지역의 매물이 없을 때
        if(result.length === 0) {
            res.send({success : 'fail'});
        }// 해당 지역의 매물이 있을 때
        else {
            res.send(result);
        }
    })
    
})

app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let nickname = req.body.nickname;
    let sql = `INSERT INTO user (username,password,nickname) SELECT '${username}','${password}','${nickname}' FROM DUAL WHERE NOT EXISTS (SELECT username FROM user where username='${username}')`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.send({success : 'success'});
    })
})

app.get('/location_ctr', (req, res) => {
    let sql = `SELECT location_name,nickname FROM set_location LEFT JOIN user ON set_location.user_id = user.idUSER WHERE nickname='${req.user.nickname}';`
    con.query(sql, function(err, result) {
        if(err) throw err;
        const location_arr = result.map(data => data.location_name);
        res.send(location_arr);
    })
})

app.post('/location_ctr_add', (req, res) => {
    let user_nickname = req.user.nickname;
    let sql2 = `SELECT idUSER FROM user WHERE nickname='${user_nickname}'`;
    con.query(sql2, function(err, result) {
        if (err) throw err;
        let location_name = req.body.location_name;
        let user_id = result[0].idUSER;
        let sql = `INSERT INTO set_location (location_name,user_id) VALUES ('${location_name}','${user_id}')`;
        con.query(sql, function(err, result){
            if(err) throw err;
            res.send({success : 'success'});
        })
    })
})

app.delete('/location_ctr_delete', (req, res) => {
    //문자열 형식으로 받은 배열을 배열 타입으로 바꿔주는 작업
    let str = req.body.target;
    let str2 = str.replace(/['"]+/g, '');
    let str3 = str2.slice(1,-1);
    let target_arr = str3.split(',');
    
    //user_id를 먼저 얻어오고 그 후에 DELETE 문 실행
    let user_nickname = req.user.nickname;
    let sql2 = `SELECT idUSER FROM user WHERE nickname='${user_nickname}'`;
    con.query(sql2, function(err, result) {
        if(err) throw err;
        let user_id = result[0].idUSER;    
        target_arr.forEach(element => {
            let sql = `DELETE FROM set_location WHERE location_name='${element}' AND user_id='${user_id}'`;
            con.query(sql, function (err, result) {
                if(err) throw err;
                res.send({success : 'success'});
            })
        });    
    })
})

app.post('/check_id', (req, res)=> {
    let username =  req.body.id;
    let sql = `SELECT username FROM user WHERE username='${username}'`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        if(result.length === 0){
            res.send({success : 'success'});
        }
        else{
            res.send({success : 'fail'});
        }
    })
})

app.get('/', (req, res)=> {
    if(req.user) {
        //유저가 로그인 되어 있다면 유저 정보를 토대로 설정해놓은 지역 데이터를 받아옴
        let sql = `SELECT location_name,nickname FROM set_location LEFT JOIN user ON set_location.user_id = user.idUSER WHERE nickname='${req.user.nickname}';`
        con.query(sql, function(err, result) {
            if(err) throw err;
            const location_arr = result.map(data => data.location_name);
            //ejs 파일에 지역 정보를 넘겨줘서 홈페이지에서 새로고침 될 때마다 Select 태그의 option이 추가 되도록 설정
            res.render('logined.ejs', {username: req.user.nickname, list: location_arr});
        })
    }else{
        res.sendFile(__dirname + '/index.html');
    } 
})

app.listen(8000, function(){
    console.log('Listening on 8000')
});