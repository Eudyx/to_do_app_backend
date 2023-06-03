const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    const authheader = req.headers.authorization || req.headers.Authorization;
    if(!authheader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authheader.split(' ')[1];

    console.log(token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT;