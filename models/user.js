const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, trim: true, unique: true },
  fullname: { type: String, trim: true, default: '' },
  email: { type: String, lowercase: true, unique: true, required: [true, 'El correo es requerido'] },
  password: { type: String, default: '' },
  userImage: { type: String, default: 'default.png' },
  facebook: { type: String, default: '' },
  fbTokens: Array,
  google: { type: String, default: '' }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
    }
  }
});
userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
userSchema.methods.validUserPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);