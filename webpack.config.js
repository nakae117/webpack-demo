var webpack = require('webpack'),
	path = require('path'),
	srcPath = path.join(__dirname, 'src/js'),
	buildPath = path.join(__dirname, 'dist');

const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: path.join(srcPath, 'app.js'),
	output: {
		path: buildPath,
		filename: 'js/app.js'
	},
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			hash: true
		}),
		new MiniCSSExtractPlugin({
			filename: './styles.css',
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			"window.jQuery": 'jquery'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCSSExtractPlugin.loader, 'css-loader'],
			}, {
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			},
		]
	}
}