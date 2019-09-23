const { mix } = require('laravel-mix');
let env;

try {
	env = require('./.env.json');
}
catch(er) {
	env = false;
}

if (!mix.inProduction()) {
	mix.webpackConfig({
		devtool: 'source-map'
	})
	.sourceMaps()
}

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix
	.js([
		'source/public/scripts/app.js'
	], 'assets/scripts/app.js')
	.sass('source/public/styles/bundle.scss', 'assets/styles')
	.sass('source/admin/styles/bundle-editor.scss', 'assets/styles')


/*
 |--------------------------------------------------------------------------
 | Environment loading
 |--------------------------------------------------------------------------
 |
 | Copy the env.json.sample and save as env.json
 |
 | Change all required settings in that file to suite your environment
 |
 */
if(env !== false) {
	mix.browserSync(env.browserSync)
}
