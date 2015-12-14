var bunyan = require('bunyan');
var _ = require('underscore');

var _loggers = {};

module.exports = function(name) {
	if (!_loggers[name]) {
		_loggers[name] = bunyan.createLogger(_.defaults({name:name}, global.config.logger));
	}
	return _loggers[name];
};