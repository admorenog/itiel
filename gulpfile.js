#!/usr/local/bin/node

const gulp = require( 'gulp' );
const livereload = require( 'gulp-livereload' );
const del = require( 'del' );
const ts = require( 'gulp-typescript' );
const sass = require( 'gulp-sass' );
const notifier = require( 'node-notifier' );
const child_process = require( 'child_process' );
const path = require( 'path' );
const sourcemaps = require( 'gulp-sourcemaps' );
const babel = require( 'gulp-babel' );
const concat = require( 'gulp-concat' );
const webpack_stream = require('webpack-stream');
const webpack = require('webpack-stream');

function clean ( cb )
{
	del( [ 'app' ], cb );
	cb();
}

function mainJsClean ( cb )
{
	return del( [ 'app/**/*.js*' ], cb );
}

function renderJsClean ( cb )
{
	return del( [ 'res/scripts/**/*.js*' ], cb );
}

function templatesClean ( cb )
{
	return del( [ 'app/src/views' ], cb );
}

function cssClean ( cb )
{
	return del( [ 'app/src/views/styles' ], cb );
}

function sassTranspile ( cb )
{
	gulp.src( './src/views/styles/app.scss' )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( gulp.dest( './res/styles' ) )
		.on( 'error', reportError );


	notifier.notify( {
		title: "Sass transpiled",
		message: "Sass transpiled",
		icon: './core/components/gulp/sass.png'
	} );

	cb();
}

function cssMinify ( cb )
{
	// body omitted
	cb();
}

function jsMinify ( cb )
{
	// body omitted
	cb();
}

function publish ( cb )
{
	// body omitted
	cb();
}

function templatesCopy ( cb )
{
	gulp.src( 'src/views/**/*.ejs' )
		.pipe( gulp.dest( 'app/src/views' ) )
		.on( 'error', reportError )
		.on( 'finish', () =>
		{
			notifier.notify( {
				title: "Templates copied",
				message: "Templates copied",
				icon: './core/components/gulp/html.png'
			} );
		} );
	cb();
}

function mainTsTranspile ( cb )
{
	var tsProject = ts.createProject( '.vscode/tsconfig.json' );

	var tsResult = tsProject.src()
		.pipe( sourcemaps.init() )
		.pipe( tsProject() )
		.on( 'error', reportError );

	tsResult.js
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( tsProject.options.outDir ) )
		.on( 'error', reportError );

	notifier.notify( {
		title: "Typescript transpiled",
		message: "Typescript transpiled",
		icon: './core/components/gulp/ts.png'
	} );
	cb();
};

function renderTsTranspile ( cb )
{
	var tsProject = ts.createProject( '.vscode/render_tsconfig.json' );

	var tsResult = tsProject.src()
		.pipe( sourcemaps.init() )
		.pipe( tsProject() )
		.on( 'error', reportError );

	tsResult.js
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( tsProject.options.outDir ) )
		.on( 'error', reportError );

	notifier.notify( {
		title: "Typescript transpiled",
		message: "Typescript transpiled",
		icon: './core/components/gulp/ts.png'
	} );
	cb();
};

function renderJsTranspile ( cb )
{
	gulp.src( 'src/views/scripts/Itiel.js' )
		.pipe( sourcemaps.init() )
		.pipe( webpack_stream( require( './webpack.config' ) ) )
		.pipe( gulp.dest( 'res/scripts' ) )
		.pipe( concat( 'main.js' ) )
		.pipe( sourcemaps.write( '.' ) )
		.on( 'error', reportError )
		.on( 'finish', () =>
		{
			notifier.notify( {
				title: "Javascript transpiled",
				message: "Javascript transpiled",
				icon: './core/components/gulp/ts.png'
			} );
		} );
	cb();
}

function makeAutoload ( cb )
{
	child_process.execSync( process.cwd() + path.sep + "conductor.js dump-autoload" );
	// var tsProject = ts.createProject( {

	// } );

	// var tsResult = tsProject.src()
	// 	.pipe( sourcemaps.init() )
	// 	.pipe( tsProject() )
	// 	.on( 'error', reportError );

	// tsResult.js
	// 	.pipe( sourcemaps.write() )
	// 	.pipe( gulp.dest( 'app/autoload.js' ) )
	// 	.on( 'error', reportError );

	cb();
};

function reportError ( error )
{
	console.error( error.stack );
	notifier.notify( {
		title: error.name,
		message: error.message,
		sound: "Basso",
		icon: './core/components/gulp/error.png'
	} );
}

exports.watch = function ( cb )
{
	// Files we need to watch
	// TS files of the core
	// TS files of the render
	// EJS files
	// Sass files
	gulp.watch(
		[ 'core/**/*.ts', 'src/**/*.ts', '!src/views/**/*.ts', '!src/views/templates/**/*', '!src/views/styles/**/*' ],
		gulp.series( mainJsClean, mainTsTranspile )
	);

	gulp.watch(
		[ 'src/views/**/*.ts', '!core/**/*.ts', '!src/views/templates/**/*', '!src/views/styles/**/*' ],
		gulp.series( renderJsClean, renderTsTranspile )
	);

	gulp.watch(
		[ 'src/views/**/*.js', '!core/**/*.js', '!src/views/templates/**/*', '!src/views/styles/**/*' ],
		renderJsTranspile
	);

	gulp.watch(
		[ 'src/views/**/*.ejs' ],
		gulp.series( templatesClean, templatesCopy )
	);

	gulp.watch(
		[ 'src/views/styles/**/*' ],
		gulp.series( cssClean, sassTranspile )
	);
	cb();
};

exports.default = gulp.series(
	clean,
	gulp.parallel(
		sassTranspile,
		mainTsTranspile
	),
	gulp.series( templatesClean, templatesCopy )
);

exports.prod = gulp.series(
	clean,
	gulp.parallel(
		sassTranspile,
		mainTsTranspile,
		templatesCopy
	),
	gulp.parallel(
		cssMinify,
		jsMinify
	),
	publish
);