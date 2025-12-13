require('dotenv').config({ quiet: true });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.disable('view cache');

// livereload MUST be before routes
require('./middleware/livereload')(app);

// global middlewares
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cookieParser());

// routes (last)
app.use(require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
