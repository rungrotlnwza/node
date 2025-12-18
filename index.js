// libarry ต่าง ๆ
require('dotenv').config({ quiet: true });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT;

// view engine
app.set('view engine', 'ejs');
app.disable('view cache');
app.use(expressLayouts);
app.set('layout', false);

// middlewares
require('./lib/middleware/livereload')(app);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use(require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});