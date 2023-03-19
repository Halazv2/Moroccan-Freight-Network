const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const CompanySchema = new Schema({
  ste: requiredString,
  num: requiredString,
  ice: requiredString,
  pwd: requiredString,
  manager: requiredString,
  coord: [Number],
  address: String,
  refreshToken: String,
});

module.exports = mongoose.model('Companies', CompanySchema);
