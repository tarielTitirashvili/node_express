const mongoose  = require('mongoose');

const companies = ['ikea', 'liddy', 'caressa', 'marcos']

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided!']
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided as a string']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating:{
    type: Number,
    default: 0
  },
  cratedAt: {
    type: Date,
    default: Date.now()
  },
  company: {
    type: String,
    enum: {
      values: companies,
      message: '{VALUE} is not supported'
    }
  }
});

module.exports = mongoose.model('Product', productSchema)