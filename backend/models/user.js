const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,   // Field for storing the reset token
  resetTokenExpiration: Date,   // Field for storing the expiration time of the reset token
  
  // other user fields...
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
