const mongoose = require('mongoose');

const MoiSchema = new mongoose.Schema({
  moisture: {
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

module.exports = Moisture = mongoose.model('moisture', MoiSchema);
