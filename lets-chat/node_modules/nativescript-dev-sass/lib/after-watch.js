var converter = require('./converter');

module.exports = function ($logger) {
	var watcher = converter.getWatcher();
	if (watcher) {
		$logger.info("Stopping nativescript-dev-sass watcher");
		watcher.close();
	}
}
