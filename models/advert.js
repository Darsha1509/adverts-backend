const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdvertModelSchema = new Schema({
  title: {
    type: String,
    min: 10,
    max: 50,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9.-]*$/.test(v);
      },
      message: props => `${props.value} is not a valid title!`,
    },
  },
  description: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9.-]*$/.test(v);
      },
      message: props => `${props.value} is not a valid description!`,
    },
  },
  category: {
    type: String,
    enum: [
      'The property',
      'Auto & transport',
      'Equipment',
      'Fashion & Style',
      'Everything for children & mothers',
      'Housing',
      'Repair & construction',
      'Garden',
      'Hobby, sport & tourism',
      'Wedding, bussiness & study',
      'Services',
      'Other',
    ],
  },
  price: {
    type: Number,
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: props => `${props.value} is not a valid price!`,
    },
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
  },
});

// Export model.
module.exports = mongoose.model('Advert', AdvertModelSchema);
