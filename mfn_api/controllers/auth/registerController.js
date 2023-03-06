"use strict";
const Company = require('../../models/companies.js');
const bcrypt = require('bcrypt');

const handleNewCompany = async (req, res) => {
    const { ste , num , ice , pwd , manager , coord } = req.body;
    if (!ste || !num || !ice || !pwd || !manager || !coord ) return res.status(400).json({ 'message': 'All Champs are required.' });
    // check for duplicate usernames in the db mongoose middleware
    const duplicate = await Company.countDocuments({ 
        $or: [
            { ste: ste },
            { num: num },
            { ice: ice }
        ]
    });  
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const company = new Company({
            ste: ste,
            num: num,
            ice: ice,
            pwd: hashedPwd,
            manager: manager,
            coord: coord
        });
        await company.save();
        res.status(200).json(company);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewCompany };