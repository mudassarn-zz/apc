var moment = require('moment')
        , crypto = require('crypto');

module.exports.sayHello = function (user,callback) {
    console.log("Hello");
    var session_key;
            
    if(!!user.session_key){
        session_key = user.session_key;
    } else {
        session_key = crypto.createHash('md5').update((moment().unix() + Math.random()).toString()).digest("hex");
    }
    console.log(global.db.User.findById(user.id));
    console.log("session_key:"+session_key);
    global.db.User.findById(user.id).then(function (u) {
        console.log(u.updateAttributes);
        var session_timestamp = moment().unix();
        u.updateAttributes({
            v_session_key: session_key,
            i_session_timestamp: session_timestamp
        }).then(function (result) {
            console.log("Updated");
            typeof callback === 'function' && callback(session_key);

        }).catch(function(error){
                console.log("update unsuccessful",error);   
        });
    });
} ;
module.exports.set_timestamp = function (user, callback) {
    console("Generating session key");
    var session_key;
            
    if(!!user.session_key){
        session_key = user.session_key;
    } else {
        session_key = crypto.createHash('md5').update((moment().unix() + Math.random()).toString()).digest("hex");
    }

    global.db.User.findById(user.id).then(function (u) {
        console.log(user);

        var session_timestamp = moment().unix();

        u.updateAttributes({
            v_session_key: session_key,
            i_session_timestamp: session_timestamp

        }).then(function () {
            typeof callback === 'function' && callback(session_key);
        });
    });
};

module.exports.update_time = function (session_key, callback) {

    global.db.User.find({where: ['v_session_key=?', session_key]}).success(function (user) {

        user.updateAttributes({
            i_session_timestamp: moment().unix()
        }).success(function () {
            typeof callback === 'function' && callback();
        });
    });
};