const mongoose = require('mongoose');

const MoicontrollersSchema = new mongoose.Schema({
  sensor_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  motor_status: {
    type: Boolean,
    required: true,
  },
  lowerbound_moi: {
    type: Number,
    required: true,
  },
  upperbound_moi: {
    type: Number,
    required: true,
  },
});

module.exports = Moicontrollers = mongoose.model('moisturecontrollers', MoicontrollersSchema);
