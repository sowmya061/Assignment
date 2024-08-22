const mongoose = require('mongoose');
const orgSchema = new mongoose.Schema({
    name: { type: String, required: true },
    account: { type: String, required: true },
    website: { type: String, required: true },
    fuelReimbursementPolicy: { type: String, default: '1000' },
    speedLimitPolicy: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Org' }
});
module.exports = mongoose.model('Org', orgSchema);
