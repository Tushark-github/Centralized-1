const mongoose = require('mongoose');
const producerSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  mobileNo: {
    type: Number
  },
  location: {
    type: String,
  },
  address: {
    type: String,
  },
  pin: {
    type: Number,
  },
  provider: {
    type: String,
  }
})

const Producer = mongoose.model('Producer', producerSchema);
module.exports = Producer;