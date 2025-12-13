require('dotenv').config({ quiet: true });
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT;
const setupLiveReload = require('./middleware/livereload');
const cookieParser = require('cookie-parser');

// Express setup
setupLiveReload(app);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/assets',express.static('assets'))
app.use(express.json());
app.use(require('./routes/routes')); // routes ของคุณ
// ใช้ cookie-parser
app.use(cookieParser());

// Body parser
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
