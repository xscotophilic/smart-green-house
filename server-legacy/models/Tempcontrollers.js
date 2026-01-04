const mongoose = require('mongoose');

const TempcontrollersSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  fan_status: {
    type: Boolean,
    required: true,
  },
  light_status: {
    type: Boolean,
    required: true,
  },
  lowerbound_temp: {
    type: Number,
    required: true,
  },
  upperbound_temp: {
    type: Number,
    required: true,
  },
});

module.exports = Tempcontrollers = mongoose.model('tempcontrollers', TempcontrollersSchema);
