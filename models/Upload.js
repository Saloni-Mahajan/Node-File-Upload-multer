const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  filename: {
    type: String,
    default:null
  },
  path: {
    type: String,
    default:null
  },
  size: {
    type: String,
    default:null
  },
  mime: {
    type: String,
    default:null
  }
});

module.exports= mongoose.model('Uploads', fileUploadSchema);
