var path = require('path');
//  var home = require(path.join('../app/controllers/home'));
var routers = require(path.join(global.config.root, 'app/routers'));
var controllers = require(path.join(global.config.root, 'app/controllers'));

module.exports = function (app) {

/*
    app.use(function(req, res, next){
       res.locals.routes = routes; 
       next();
    });
*/
    //home route        
    //app.get('/', home.index);
    
  app.get('/', controllers.users.loginForm);
	app.use('/user', routers.user)

}	