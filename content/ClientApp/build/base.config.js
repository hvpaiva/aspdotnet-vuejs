const productionConfig = require('../../appsettings.json');
const devConfig = require('../../appsettings.Development.json');

const environment = process.env.NODE_ENV;
const isProduction = environment === 'production';

const CurrentEnvironment = isProduction
	? productionConfig
	: devConfig;

const has = Object.prototype.hasOwnProperty;

module.exports = {

	environment,

	isProduction,

	baseUriPath: has.call(CurrentEnvironment, 'BaseUriPath')
	             && CurrentEnvironment.BaseUriPath !== ''
		? CurrentEnvironment.BaseUriPath
		: '/',

	generateMapFiles: has.call(CurrentEnvironment, 'GenerateMapFiles')
		? CurrentEnvironment.GenerateMapFiles
		: false
};
