const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const { GOOGLE_PLACES_API_KEY, SERVER_URL } = process.env;

module.exports = function (config) {
	if (process && process.env.NODE_ENV === 'production') {
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.GOOGLE_PLACES_API_KEY': JSON.stringify(GOOGLE_PLACES_API_KEY),
				'process.env.SERVER_URL': JSON.stringify(SERVER_URL)
			})
		);
	}
	else {
		config.plugins.push(new Dotenv());
	}
};