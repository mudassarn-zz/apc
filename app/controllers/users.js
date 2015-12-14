var path = require("path"),
    _ = require('lodash'),
    url = require('url'),
    crypto = require('crypto'),
    authentication = require(path.join(global.config.root, 'modules/authentication'));

var pathToAssets                            = '/bootstrap-3.3.1',
    pathToSelectedTemplateWithinBootstrap   = '/bootstrap-3.3.1/docs/examples/jumbotron';
module.exports = {
    loginForm:function(req,res) {
        res.render('login', { title: 'Login to APC', 
                                'pathToAssets': pathToAssets,
                                'pathToSelectedTemplateWithinBootstrap' : pathToSelectedTemplateWithinBootstrap 
        });

    },
    login:function(req,res){
        try {
            var user = {};
            authentication.authenticate(req.body).then(function(user){
                console.log("Authentication successful");
                console.log(user)
                viewOptions = _.pick(user,"id","v_first_name","v_last_name","v_email","v_picture","profileImageRoute","v_username","v_session_key");
                viewOptions['pathToAssets'] = pathToAssets;
                viewOptions['pathToSelectedTemplateWithinBootstrap'] = pathToSelectedTemplateWithinBootstrap;
                //res.json(user);
                res.render('admin', viewOptions);
            }).catch(function(error){
                console.log("authentication unsuccessful",error);
                res.status(401).json({
                    "error":error
                });
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                    "error":error
            });
        }

    },
    doctors:function(req,res) {
        global.db.User.findAll({
            where: {
                i_user_role: 2
            }
        }).then(function(users) {
            console.log(users.length);
            viewOptions = {"usersList": users};
            viewOptions['userType'] = "Doctor";
            viewOptions['pathToAssets'] = pathToAssets;
            viewOptions['pathToSelectedTemplateWithinBootstrap'] = pathToSelectedTemplateWithinBootstrap;
            res.render('users',viewOptions);    
        });
    },
    patients:function(req,res) {
        global.db.User.findAll({
            where: {
                i_user_role: 3
            }
        }).then(function(users) {
            viewOptions = {"usersList": users};
            viewOptions['userType'] = "Patient";
            viewOptions['pathToAssets'] = pathToAssets;
            viewOptions['pathToSelectedTemplateWithinBootstrap'] = pathToSelectedTemplateWithinBootstrap;
            res.render('users',viewOptions);    
        });
    },
    addUserForm:function(req,res) {
        console.log(req);
        var params = url.parse(req.url, true).query;
        console.log(params);
        viewOptions = {};
        viewOptions['userType'] = params.userType;
        viewOptions['pathToAssets'] = pathToAssets;
        viewOptions['pathToSelectedTemplateWithinBootstrap'] = pathToSelectedTemplateWithinBootstrap;
        res.render('add_user',viewOptions);    

    },
    addUser:function(req,res) {
        var userTypes = {"Doctor":2, "Patient":3}

        var passwordHash = crypto.createHash('md5').update(req.body.password).digest("hex");
        var user = global.db.User.build({
            v_username: req.body.username,
            v_password: req.body.password,
            v_email: req.body.username,
            v_first_name: req.body.first_name,
            v_last_name: req.body.last_name,
            i_user_role: userTypes[req.body.userType]
        }).save().then(function(user) {
            global.db.User.findAll({
            where: {
                i_user_role: userTypes[req.body.userType]
            }
        }).then(function(users) {
            viewOptions = {"usersList": users};
            viewOptions['userType'] = req.body.userType;
            viewOptions['pathToAssets'] = pathToAssets;
            viewOptions['pathToSelectedTemplateWithinBootstrap'] = pathToSelectedTemplateWithinBootstrap;
            res.render('users',viewOptions);    
        });

        }).catch(function(error) {
            viewOptions = {};
            viewOptions['message'] = error;
            viewOptions['error']   = error;
            res.render('error',viewOptions)

        });

    }
}