const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;

    if(!email || !pwd) return res.status(400).json({ "message": "Email and password are required" });

    const foundUser = await User.findOne({ email }).exec();
    
    if(!foundUser) return res.status(401);

    const match = bcrypt.compare(pwd, foundUser.password);
    if(match) {
        const accessToken =  jwt.sign(
            {
                "username": foundUser.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '60s'}
        );
        
        const refreshToken =  jwt.sign(
            {
                "username": foundUser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        console.log(result);

        res.cookie('jwt', { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        res.json({ accessToken });

    }else{
        res.sendStaus(401);
    }

}

module.exports = {handleLogin};