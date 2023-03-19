"use strict";
const Company = require('../../models/companies.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { ice, pwd } = req.body;
    if (!ice || !pwd) return res.status(200).json({ 'message': 'All Champs are required.' });
    const foundCompany = await Company.findOne({ ice: ice });

    if (!foundCompany) return res.status(200).json({ 'message': 'No account'});

    const match = await bcrypt.compare(pwd, foundCompany.pwd);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "ice": foundCompany.ice },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "ice": foundCompany.ice },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        await Company.updateOne({ ice: foundCompany.ice}, { refreshToken: refreshToken });
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}



module.exports = { handleLogin };