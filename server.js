const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
let loginedHTML = require('./frontend/JS/views/logined_page.js');
// const ejs = require('ejs');


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
    store: new FileStore(),
    cookie: false
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


var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const { cookie, render } = require('express/lib/response');

app.use(passport.initialize());
app.use(passport.session());

//세션 처리
passport.serializeUser(function(user, done) {
    console.log('serializeUser', user.nickname);
    done(null, user.nickname);
});
  
passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    done(null, id);
});

//로그인 정보 인증 과정
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username,password);
        let sql = `SELECT * FROM user WHERE username='${username}'`;
        con.query(sql, [username, password], function(err, result) {
            if(err)
                return done(null, false, {message: 'Incorrect username'});
            else {
                if(password === result[0].password) {
                    let json = JSON.stringify(result[0]);
                    let userinfo = JSON.parse(json);
                    console.log(userinfo);
                    return done(null, userinfo);
                } else{
                    return done(null, false, { message: 'Incorrect password.' });
                }
            }
        })
    }
));

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    // failureFlash: true
    })
);

app.get('/logout', (req, res)=> {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
})

app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let nickname = req.body.nickname;
    let sql = `INSERT INTO user (username,password,nickname) VALUES('${username}','${password}','${nickname}')`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        console.log('회원가입 성공');
    })
})

// app.get('/rr', (req, res) => {
//     console.log('test', req.user);
// })

app.get('/', (req, res)=> {
    if(req.user) {
        res.render('logined.ejs', {username: req.user});
    }else{
        res.sendFile(__dirname + '/index.html');
    } 
})

app.listen(8000, function(){
    console.log('Listening on 8000')
});