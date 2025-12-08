const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

module.exports = function setupLiveReload(app) {
    // Enable livereload only when explicitly requested to avoid
    // SSL protocol errors when the main server runs over HTTPS.
    // Set environment variable `LIVERELOAD=true` to enable.
    const enable = process.env.LIVERELOAD === 'true';
    if (enable) {
        const liveReloadServer = livereload.createServer();
        liveReloadServer.watch(path.join(__dirname, '..', 'public'));

        app.use(connectLivereload());
    }
};
