if (!global.hasOwnProperty('db')) {
	console.log("Setting up Sequelize");
    var Sequelize = require('sequelize')
            , sequelize = null
            , default_config = global.config.default_db;

    // the application is executed on the local machine ... use mysql
    var defaultLogger = require('../modules/logger.js')('sequelize/default');
    var defaultOptions = {
        "host": default_config.host,
        "port": default_config.port,
        "dialect": "mysql",
        "define": {
            "timestamps": false,
            "freezeTableName": true,
            "syncOnAssociation": false
        },
        "logging": (default_config.logging == undefined ? function(x) { defaultLogger.trace(x); } : default_config.logging),
		"dialectOptions": { multipleStatements: true }
    };

    if (default_config.socketPath) {
        defaultOptions.dialectOptions.socketPath = default_config.socketPath;
    }

    default_sequelize = new Sequelize(default_config.database, default_config.username, default_config.password, defaultOptions);
    global.db = {
        Sequelize: Sequelize,
        sequelize: default_sequelize
    };
    console.log("Sequelize setup successfully");
}
