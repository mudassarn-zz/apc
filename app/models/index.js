var path = require('path');

if (!global.hasOwnProperty('db'))
    require(path.join(global.config.root, 'db'));

var sequelize = global.db.sequelize;

var models;

// models
global.db = models = {
    User: sequelize.import(__dirname + '/user')
}

console.log(__dirname + '/user');
console.log(models);

global.db.sequelize = sequelize;
sequelize.sync().then(function() {
	console.log("Database is synched");
}).catch(function(error) {
	console.log(error);
})