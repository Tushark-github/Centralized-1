const mongoose = require('mongoose');
const consumerSchema = new mongoose.Schema({
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
    type: Number
  }
})

const Consumer = mongoose.model('Consumer', consumerSchema);
module.exports = Consumer;