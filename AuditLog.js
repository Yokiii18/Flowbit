const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tenant: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
