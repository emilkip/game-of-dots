const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	mode: 'development',
	entry: './src/app/index.jsx',

	resolve: {
		extensions: ['.jsx', '.js'],
		alias: {
			'@styles': path.resolve(__dirname, 'src/app/styles'),
			'@layouts': path.resolve(__dirname, 'src/app/layouts'),
			'@components': path.resolve(__dirname, 'src/app/components'),
			'@service': path.resolve(__dirname, 'src/app/services')
		}
	},

	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: '[hash].client.js'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},

	devServer: {
		publicPath: '/',
		contentBase: path.join(__dirname, '/src'),
		compress: true,
		port: 1337
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	]
};
