const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', require('./routes/root'));

app.use('/register', require('./routes/register'));

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

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));