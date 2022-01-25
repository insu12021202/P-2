module.exports = function (app, con){
    const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    const { cookie, render } = require('express/lib/response');

    app.use(passport.initialize());
    app.use(passport.session());

    //세션 처리
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });
    
    passport.deserializeUser(function(id, done) {
        let sql = `SELECT nickname FROM user WHERE username='${id}'`;
        con.query(sql, function(err, result) {
            if(err) throw err;
            else{
                done(null, result[0]);
            }
        })
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
                        return done(null, userinfo);
                    } else{
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                }
            })
        }
    ));

    return passport;
}

