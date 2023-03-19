const Company = require('../../models/companies.js');

const handleGetCompanies = (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) return res.status(500).json({ 'message': err.message });
        res.status(200).json(companies);
    });
}

module.exports = { handleGetCompanies };