const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  name: { type: String, trim: true, default: '' },
  country: { type: String, trim: true, default: '' },
  image: { type: String, default: 'default.png' },
  fans: [{
    username: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, default: '' }
  }]
});

module.exports = mongoose.model('Club', clubSchema);