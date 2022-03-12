const path = require( 'path' );
const webpack = require( 'webpack' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const isProduction = process.env.NODE_ENV === 'production';

/* Plugins */
const defaultPlugins = defaultConfig.plugins
	.map( ( plugin ) => {
		const name = plugin.constructor.name;

		// Remove LiveReloadPlugin if in development mode b/c using browsersync + HMR
		if ( name.includes( 'LiveReloadPlugin' ) ) {
			return false;
		}
		// Remove CleanWebpackPlugin b/c it tailwindcss files
		if ( name.includes( 'CleanWebpackPlugin' ) ) {
			return false;
		}

		return plugin;
	} )
	.filter( ( plugin ) => plugin );

const config = {
	...defaultConfig,
	mode: isProduction ? 'production' : 'development',
	devtool: 'source-map',
	entry: {
		index: isProduction
			? [ path.resolve( process.cwd(), `src/index.js` ) ]
			: [
					path.resolve( process.cwd(), `./src/index.js` ),
					'webpack-hot-middleware/client?name=index&timeout=20000&reload=true&overlay=true',
			  ],
	},
	output: isProduction
		? {
				path: path.resolve( process.cwd(), `./build` ),
				filename: '[name].js',
				// needed to add this to resolve issues that arise
				// if building/activating multiple block plugins
				jsonpFunction: 'dgwyer',
		  }
		: {
				publicPath: `/build/`,
				path: path.resolve( process.cwd(), `./build` ),
				filename: '[name].js',
		  },
	module: {
		...defaultConfig.module,
	},
	optimization: {
		...defaultConfig.optimization,
	},
	plugins: isProduction
		? [ ...defaultPlugins ]
		: [
				...defaultPlugins,
				new webpack.HotModuleReplacementPlugin(),
		  ],
};

module.exports = config;
