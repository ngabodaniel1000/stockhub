const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: String,
  phone: String,
  address: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema); 