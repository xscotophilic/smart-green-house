const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_pass: {
    type: String,
    required: true,
  }
});

module.exports = User = mongoose.model('user', UserSchema);
