const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
    const authheader = req.headers.authorization || req.headers.Authorization;
    if(!authheader?.startWith('Bearer ')) return res.sendStaus(401);
    const token = authheader.split(' ')[1];

    console.log()
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