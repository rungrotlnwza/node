require('dotenv').config({ quiet: true });
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';
if (NODE_ENV === 'localhost') {
    const livereload = require('livereload');
    const connectLivereload = require('connect-livereload');
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'public'));
    app.use(connectLivereload());
}
app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
