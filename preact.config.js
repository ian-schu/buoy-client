const Dotenv = require('dotenv-webpack');

module.exports = function (config) {
	config.plugins.push(new Dotenv());
};