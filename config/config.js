var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
   development: {
       instanceHost: "apc.loc",
       root: rootPath,
       app: {
           name: 'apc-node'
       },
       port: 3000,
       default_db: {
           username: "root",
           password: "",
           database: "apc",
           host: "127.0.0.1",
           port: 3306,
           dialect: "mysql",
           logging: function(s) {
                console.log(s);
            }
       },
       logger: {
            src: true,
            excludes: ['req', 'res', 'req-headers', 'res-headers', 'user-agent', 'referer', 'body'],
            streams: [{
                level: 'debug',
                mode: 'short',
                stream: process.stdout
            }]
        },
       domainForCookie: "",
       baseUrl: "http://apc.loc:3000",
   },

   test: {
        instanceHost: "apc.loc",
       root: rootPath,
       app: {
           name: 'apc-node'
       },
       port: 3000,
       default_db: {
           username: "root",
           password: "",
           database: "apc_test",
           host: "127.0.0.1",
           port: 3306,
           dialect: "mysql",
           logging: function(s) {
                console.log(s);
            }
       },
       logger: {
            src: true,
            excludes: ['req', 'res', 'req-headers', 'res-headers', 'user-agent', 'referer', 'body'],
            streams: [{
                level: 'debug',
                mode: 'short',
                stream: process.stdout
            }]
        },
       domainForCookie: "",
       baseUrl: "http://apc.loc:3000",

   },
   
   production: {
              instanceHost: "apc.loc",
       root: rootPath,
       app: {
           name: 'apc-node'
       },
       port: 3000,
       default_db: {
           username: "root",
           password: "",
           database: "apc_production",
           host: "127.0.0.1",
           port: 3306,
           dialect: "mysql",
           logging: function(s) {
                console.log(s);
            }
       },
       logger: {
            src: true,
            excludes: ['req', 'res', 'req-headers', 'res-headers', 'user-agent', 'referer', 'body'],
            streams: [{
                level: 'debug',
                mode: 'short',
                stream: process.stdout
            }]
        },
       domainForCookie: "",
       baseUrl: "http://apc.loc:3000",
   },
};

module.exports = config[env];
