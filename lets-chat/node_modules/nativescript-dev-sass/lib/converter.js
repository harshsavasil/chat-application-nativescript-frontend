exports.convert = convert;
exports.getWatcher = getWatcher;

var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var choki = require('chokidar');
var watcher = null;
var watchPromisesChain = Promise.resolve();

function convert(logger, projectDir, appDir, options) {
	options = options || {};
	var sassPath = getSassPath(logger);
	var data = {
		sassPath,
		projectDir,
		appDir,
		logger,
		options
	};
	
	if (options.watch) {
		createWatcher(data);
	}

	return spawnNodeSass(data);
}

function getWatcher() {
	return watcher;
}

function createWatcher(data) {
	var appDir = data.appDir;
	var watcherOptions = {
		ignoreInitial: true,
		cwd: appDir,
		awaitWriteFinish: {
			pollInterval: 100,
			stabilityThreshold: 300
		},
		ignored: ['**/.*', '.*'] // hidden files
	};
	
	watcher = choki.watch(['**/*.scss', '**/*.sass'], watcherOptions)
		.on('all', (event, filePath) => {
			watchPromisesChain = watchPromisesChain
				.then(() => spawnNodeSass(data))
				.catch(err => {
					if (!err.stopExecution && err.errorAsWarning) {
						data.logger.warn(err.message);
					} else {
						throw err;
					}
				});
		});
}

function getSassPath(logger) {
	var sassPath = require.resolve('node-sass/bin/node-sass');
	if (fs.existsSync(sassPath)) {
		logger.info('Found peer node-sass');
	} else {
		throw new Error('node-sass installation local to project was not found. Install by executing `npm install node-sass`.');
	}

	return sassPath;
}

function spawnNodeSass(data) {
	return new Promise(function (resolve, reject) {
		var sassPath = data.sassPath,
			projectDir = data.projectDir,
			appDir = data.appDir,
			logger = data.logger,
			options = data.options;

		var importerPath = path.join(__dirname, "importer.js");

		// Node SASS Command Line Args (https://github.com/sass/node-sass#command-line-interface)
		// --ouput : Output directory
		// --output-style : CSS output style (nested | expanded | compact | compresed)
		// -q : Supress log output except on error
		// --follow : Follow symlinked directories
		// -r : Recursively watch directories or files
		// --watch : Watch a directory or file
		var nodeArgs = [sassPath, appDir, '--output', appDir, '--output-style', 'compressed', '-q', '--follow', '--importer', importerPath];
		logger.trace(process.execPath, nodeArgs.join(' '));

		var env = Object.create( process.env );
		env.PROJECT_DIR = projectDir;
		env.APP_DIR = appDir;

		var currentSassProcess = spawn(process.execPath, nodeArgs, { env: env });

		var isResolved = false;

		currentSassProcess.stdout.on('data', function (data) {
			var stringData = data.toString();
			logger.info(stringData);
		});

		currentSassProcess.stderr.on('data', function (err) {
			var message = '';
			var stringData = err.toString();

			try {
				var parsed = JSON.parse(stringData);
				message = parsed.formatted || parsed.message || stringData;
			} catch (e) {
				message = err.toString();
			}

			logger.info(message);
		});

		currentSassProcess.on('error', function (err) {
			logger.info(err.message);
			if (!isResolved) {
				isResolved = true;
				err.errorAsWarning = true;
				err.stopExecution = false;
				reject(err);
			}
		});

		// TODO: Consider using close event instead of exit
		currentSassProcess.on('exit', function (code, signal) {
			currentSassProcess = null;
			if (!isResolved) {
				isResolved = true;
				if (code === 0) {
					resolve();
				} else {
					var error = new Error('SASS compiler failed with exit code ' + code);
					error.errorAsWarning = true;
					error.stopExecution = false;
					reject(error);
				}
			}
		});
	});
}
