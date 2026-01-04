const mongoose = require('mongoose');

const TempSchema = new mongoose.Schema({
  temp: {
    type: Number,
    required: true,
  },
  sensor_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  entrytime: {
    type: Date,
    required: true,
  },
});

module.exports = Temp = mongoose.model('temperature', TempSchema);
