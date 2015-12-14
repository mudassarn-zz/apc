var moment = require('moment')
    , crypto = require('crypto')
    , sessionKey = require('./session_key')
    , Promise = require("bluebird");


module.exports.authenticate = function (credentials) {

	try {
	    var query = null;
	    var options = {};

	    if (!!credentials.session_key) {
	        var seconds = (global.config.apiExpireTime || 606000) / 1000;

	        query = "SELECT DISTINCT u.id, u.v_first_name, u.v_last_name, u.v_picture ,b_picture_resized "
	        + " FROM users u"
	        + " WHERE u.v_session_key = :session_key"
	        + " AND u.i_session_timestamp > :session_timestamp"

	        options.session_key = credentials.session_key;
	        options.session_timestamp = moment().unix().subtract(seconds, 'seconds');

	    } else {

	        var passwordHash = crypto.createHash('md5').update(credentials.password).digest("hex");

	        query = "SELECT DISTINCT u.v_username, u.id, u.v_session_key, u.v_email, u.v_password,"
	        + " u.v_first_name, u.v_last_name, u.v_picture,b_picture_resized"
	        + " FROM users u"
	        + " WHERE u.v_username = :username"
	        + " AND u.v_password = :password";

	        options.username = credentials.username;
	        options.password = passwordHash;
	    }
	    return global.db.sequelize.query(query, {replacements: options, type: global.db.sequelize.QueryTypes.SELECT}).then(function (users) {
	    	console.log(users);

	        if (!!users && users.length > 0) {

	            var user = users[0];

	            if (!!user && !!user.id) {
	            	console.log(user.id);
	                return new Promise(function(resolve,reject){
	                	//console.log(sessionKey);	
	                	//sessionKey.sayHello({id: user.id, session_key: credentials.session_key});
	                    sessionKey.sayHello({id: user.id, session_key: credentials.session_key}, function (v_session_key) {
	                        console.log(v_session_key);
	                        user.v_session_key = v_session_key;
	                        resolve(user);
	                    });
	                });

	            } else {
	                throw "authentication failed";
	            }
	        }else{
	            throw "authentication failed";
	        }

	    });
	} catch (error) {
		console.log(error);
		console.log(error.stack);
		throw "authentication failed";
	}
};