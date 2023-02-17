const User = require("../model/User");
const jwt = require('jsonwebtoken');

const handleRefreshController = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return sendSatus(401);

    const foundUser = User.findOne({ refreshToken });

    if(!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);

            const accessToken = jwt.sign(
                {
                    username: decoded.username
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken });
        }
    );

}

module.exports = { handleRefreshController };