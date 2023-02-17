const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callbakc) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callbakc(null, true);
        }else {
            callbakc(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;