const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

//정적 폴더 설정
app.use(express.static('frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'sknfienf123',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
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

//passport
var authData = {
    username: 'insu12',
    password: '1111',
    nickname: 'insu'
};

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

//세션 처리
passport.serializeUser(function(user, done) {
    done(null, user.username);
});
  
passport.deserializeUser(function(id, done) {
    done(null, authData);
});

//로그인 정보 인증 과정
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username, password);
        if(username == authData.username) {
            if(password === authData.password) {
                return done(null, authData);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } else {
            return done(null, false, { message: 'Incorrect username.' });
        }
    }
));

app.post('/login', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/login'
    //failureFlash: true
    })
);

app.get('/welcome', (req, res)=> {
    let user_name = req.user.nickname;
    let html = `<h2> ${user_name}님 환영합니다 <h2>`;
    res.send(html);
})

app.get('/', (req, res)=> {
    console.log('홈 페이지',req.user);
    res.sendFile(__dirname + '/index.html');
})

app.listen(8000, function(){
    console.log('Listening on 8000')
});