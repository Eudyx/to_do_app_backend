require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middlewares/logEvents');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));

app.use('/board', require('./routes/board'));

app.all('*', (req, res) => {
    res.status(400);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')) {
        res.json({ "message": "404 not found" })
    }else {
        res.type('txt').send("404 not found")
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
});