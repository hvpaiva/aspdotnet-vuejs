const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rimraf = require('rimraf');
const BaseConfig = require('./base.config');
const AppConfig = require('../../appsettings');
const LaunchConfig = require('../../Properties/launchSettings');

const rootDir = path.resolve(__dirname, '../..');

const bundleOutputDir = path.resolve(rootDir, './wwwroot/dist');

console.info(`Building for production: ${BaseConfig.isProduction}`);
rimraf.sync(path.resolve(rootDir, 'wwwroot/**/*'), { silent: true });

if (!BaseConfig.isProduction) {
	fs.createReadStream(path.resolve(rootDir, 'ClientApp/build/publishingLoader.html'))
		.pipe(fs.createWriteStream(path.resolve(rootDir, 'wwwroot/index.html')));
}

console.info(BaseConfig);

module.exports = {
	name: 'app',
	devServer: {
		proxy: {
			'^/api': {
				target: LaunchConfig.profiles.AspDotnetVueJS.applicationUrl,
				ws: true,
				changeOrigin: true
			}
		}
	},
	mode: BaseConfig.isProduction ? 'production' : 'development',
	stats: BaseConfig.isProduction ? 'errors-only' : 'normal',
	entry: { main: path.resolve(rootDir, './ClientApp/app.js') },
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			components: path.resolve(rootDir, './ClientApp/components')
		}
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: 'initial',
					name: 'site',
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0
				},
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		},
		minimizer: [
			new UglifyJsPlugin(
				{
					cache: true,
					parallel: true,
					sourceMap: !BaseConfig.isProduction
				}
			),
			new OptimizeCSSAssetsPlugin({})
		],
		nodeEnv: BaseConfig.isProduction ? 'production' : 'development'
	},
	output: {
		path: path.resolve(rootDir, './wwwroot/dist'),
		filename: !BaseConfig.isProduction ? '[name].js' : '[name].[hash].js',
		// publicPath: In production we don't use webpack hot reload, so it should be alright.
		// the usage of the  at the beginning is for the basePath to be properly used. See
		// BaseConfig.baseUriPath. The webpack hot reload require the official URI path or you
		// will get errors in your console.
		publicPath: BaseConfig.isProduction ? `.${BaseConfig.baseUriPath}/dist/` : '/dist/'
	},
	module: {
		rules: [
			// this will apply to `.vue`
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			// this will apply to both plain `.js` files
			// AND `<script>` blocks in `.vue` files
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { modules: false }]],
						plugins: [
							'@babel/plugin-transform-runtime',
							'@babel/plugin-transform-async-to-generator'
						]
					}
				}
			},
			{
				test: /\.css$/,
				use: BaseConfig.isProduction
					? [MiniCssExtractPlugin.loader, 'css-loader']
					: ['style-loader', 'css-loader']
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.sass$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							indentedSyntax: true
						}
					}
				]
			},
			{
				test: /\.(ico|png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							outputPath: 'images/'
						}
					}
				]
			},
			{
				test: /\.pug$/,
				loader: 'pug-plain-loader'
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									name: 'fonts/[name].[hash:8].[ext]'
								}
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new webpack.DefinePlugin(
			{
				'process.env': {
					BASE_URL: JSON.stringify(BaseConfig.baseUriPath)
				}
			}
		),
		new CopyWebpackPlugin(
			[
				{
					from: path.resolve(rootDir, 'ClientApp/static/'),
					to: '../static/',
					ignore: ['.*']
				},
				{
					from: path.resolve(rootDir, 'ClientApp/favicon.ico'),
					to: '../favicon.ico',
					toType: 'file'
				}
			],
			{ debug: 'warning' }
		),
		new HtmlWebpackPlugin(
			{
				filename: path.resolve(rootDir, 'wwwroot/index.html'),
				template: path.resolve(rootDir, 'ClientApp/index.html'),
				inject: true,
				templateParameters: {
					baseHref: BaseConfig.baseUriPath,
					appName: AppConfig.App.Title
				}
			}
		)
	].concat(BaseConfig.isProduction ? [
		new MiniCssExtractPlugin(
			{
				filename: !BaseConfig.isProduction
					? 'css/[name].css'
					: 'css/[name].[hash].css'
			}
		)
	] : [])
		.concat(BaseConfig.generateMapFiles ? [
			new webpack.SourceMapDevToolPlugin(
				{
					filename: '[file].map',
					moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')
				}
			)
		] : [])
};
