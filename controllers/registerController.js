const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { 
        user,
        email,
        firstname,
        lastname,
        password
    } = req.body;

    if(
        !user || 
        !email || 
        !firstname || 
        !lastname || 
        !password
    ) return res.status(400).json({ "message": "All fields are required." });

    const duplicate = await User.findOne({ username: user }).exec();
    if(duplicate) return res.sendStatus(409); //Conflict

    try {
        // encrypt the password
        const hashedPwd = await bcrypt(password, 10);

        // Create and store the new user
        const result = await User.create({
            "username": user,
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ "success": `New user ${user} created` });
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = { handleNewUser };