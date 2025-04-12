// models/Log.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: String,
  description: String,
  Manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity-Log', logSchema);
