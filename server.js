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

app.post('/searched_item', (req, res) => {
    let user_nickname = req.user.nickname;
    let sql2 = `SELECT idUSER FROM user WHERE nickname='${user_nickname}'`;
    con.query(sql2, function(err, result) {
        if(err) throw err;
        let user_id = result[0].idUSER;
        let location = req.body.location;
        let sql = `SELECT chat_count,id,location,paths,deposit,rental_cost,m_fee,name,phone_num,chat,sub_func_list.like,user_id FROM sale_item left join sub_func_list on sub_func_list.sale_item_id = sale_item.id right join owner on sale_item.owner_id = owner.idowner inner join (select sale_item_id , group_concat(path) as paths from images group by sale_item_id) as i on(id = i.sale_item_id) where location='${location}' and(user_id='${user_id}' or user_id is null)`;
        con.query(sql, function(err, result) {
            if(err) throw err;
            //만약 해당 지역의 매물이 없을 때
            if(result.length === 0) {
                res.send({success : 'fail'});
            }// 해당 지역의 매물이 있을 때
            else {
                result.forEach(element => {
                    element.user_id = user_id;
                })
                res.send(result);
            }
        }) 
    })
})

app.post('/sub_func', (req, res) => {
    let item_id = req.body.item_id;
    let like_status = req.body.like_status;
    let user_nickname = req.user.nickname;
    let sql2 = `SELECT idUSER FROM user WHERE nickname='${user_nickname}'`;
    con.query(sql2, function(err, result) {
        if(err) throw err;
        let user_id = result[0].idUSER;
        if(like_status === '1') { //좋아요가 눌려있는 상태면 좋아요 취소 실행
            let sql = `select * from sub_func_list where sale_item_id='${item_id}' and user_id='${user_id}'`; //일단 sub_func_list에 해당 매물 번호와 user_id를 가진 row를 불러오기
            con.query(sql, function(err, result) {
                let sql3 = ``;
                if(JSON.stringify(result) === '{}') { //만약 그 row 없으면 해당 row에 like를 0으로 바꾸기
                    sql3 = `insert into sub_func_list(sale_item_id,chat,sub_func_list.like,user_id) values('${item_id}','0','0','${user_id}')`;
                }else{ //만약 그 row가 있으면 새로운 row를 만들어서 like를 0으로 설정
                    sql3 = `update sub_func_list set sub_func_list.like='0'  where sale_item_id='${item_id}' and user_id='${user_id}'`;
                }
                con.query(sql3, function(err, result) {
                    res.send({success : 'success1'});
                })
            })
        }
        if(like_status === '0') { //좋아요가 눌려있는 상태면 좋아요 취소 실행
            let sql = `select * from sub_func_list where sale_item_id='${item_id}' and user_id='${user_id}'`; //일단 sub_func_list에 해당 매물 번호와 user_id를 가진 row를 불러오기
            con.query(sql, function(err, result) {
                let sql3 = ``;
                if(JSON.stringify(result) === '[]') { //만약 그 row 없으면 해당 row에 like를 1로 바꾸기
                    sql3 = `insert into sub_func_list(sale_item_id,chat,sub_func_list.like,user_id) values('${item_id}','0','1','${user_id}')`;
                }else{ //만약 그 row가 있으면 새로운 row를 만들어서 like를 1로 설정
                    sql3 = `update sub_func_list set sub_func_list.like='1'  where sale_item_id='${item_id}' and user_id='${user_id}'`;
                }
                con.query(sql3, function(err, result) {
                    res.send({success : 'success0'});
                })
            })
        }
    })
})

app.post('/detail', (req, res) => {
    let item_id = req.body.item_id;
    let user_id = req.body.user_id;
    let like_status = req.body.like_status;
    let sql = `SELECT chat_count, id, location, deposit, paths, rental_cost, m_fee, name, phone_num, owner_profile FROM sale_item as s inner join (select sale_item_id , group_concat(path) as paths from images group by sale_item_id) as i on(s.id = i.sale_item_id) left join owner on owner_id = idowner where id='${item_id}'
    `
    con.query(sql, function(err, result) {
        if(err) throw err;
        result[0].like_status = like_status;
        result[0].user_id = user_id;
        res.send(result);
    })
})

app.post('/chat', (req, res) => {
    let item_id = req.body.item_id;
    let user_id = req.body.user_id;
    sql = `SELECT chat from sub_func_list where user_id='${user_id}' and sale_item_id='${item_id}'`; //sub_func_list에서 유저 정보와 매물id로 chat 정보 받아오기
    con.query(sql, function(err, result) {
        if(err) throw err;
        if(JSON.stringify(result) === '[]' || result[0].chat == 0){//chat == 0 이거나 아예 해당 row가 없으면 먼저 count부터 up 하고 이후 분기점 진행
            let sql2 = `SELECT chat_count from sale_item where id=${item_id}`
            con.query(sql2, function(err, result){
                if(err) throw err;
                if(result[0].chat_count == null || result[0].chat_count == 0) { //chat_count가 null이면 count를 0으로 설정
                    result[0].chat_count = 0;
                }
                 //chat_count가 0 이상이면 +1 해서 DB에 업데이트
                let chat_count = result[0].chat_count + 1;
                let sql2 = `UPDATE sale_item set chat_count=${chat_count} where id='${item_id}'`
                con.query(sql2, function(err, result) {
                    if(err) throw err;
                    console.log('채팅 카운트 성공');
                })
            })//count up 끝
             // 해당 row가 아예 없으면 sub_func_list에 새로운 row 만들기
            if(JSON.stringify(result) === '[]' ){
                let sql3 =`INSERT INTO sub_func_list(sale_item_id,chat,user_id) VALUES('${item_id}','1','${user_id}')`;
                con.query(sql3, function(err, result){
                    if(err) throw err;
                    console.log('채팅 신청 안되어있고 row가 없어서 새로 만듦');
                    res.send({});
                })
            } //row는 있는데 chat == 0이면 chat==1 로 Update하기
            else{
                console.log('row 있는데 chat이 0이라 ')
                let sql3 = `UPDATE sub_func_list SET chat='1' where sale_item_id='${item_id}' and user_id='${user_id}'`;
                con.query(sql3, function(err, result){
                    if(err) throw err;
                    console.log('채팅 신청 안되어있고 row가 있어서 UPDATE만 해줬음');
                    res.send({});
                })
            }
        }else{//채팅 신청이 되어있으면 채팅 카운트 하지 않고 state : 1 전송
            res.send({state : 1});
            console.log('이미 신청 되어있어서 아무것도 안해줄거야!')
        }
    })
})

app.post('/chat_data', (req, res) => {
    let item_id = req.body.item_id;
    let user_id = req.body.user_id;
    let sql = `SELECT name, phone_num, owner_profile, id, chat FROM owner right join sale_item on idowner = owner_id left join sub_func_list on id = sale_item_id where id='${item_id}'`;
    con.query(sql, function(err, result){
        if(err) throw err;
        result[0].user_id = user_id;
        res.send(result);
    })
})

app.post('/chatting_exit', (req, res) => {
    let item_id = req.body.item_id;
    let user_id = req.body.user_id;
    //사용자의 채팅 신청 목록의 chat을 0으로 전환
    let sql =`UPDATE sub_func_list SET chat=0 where sale_item_id=${item_id} and user_id=${user_id}`
    con.query(sql, function(err, result){
        if(err) throw err;
        //해당 매물의 채팅 신청 카운트 - 1
        let sql2 = `UPDATE sale_item SET chat_count = chat_count -1 where id='${item_id}'`;
        con.query(sql2, function(err, result){
            if(err) throw err;
            res.send({success : 'success'});
        })
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