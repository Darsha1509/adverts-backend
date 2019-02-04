const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const advertModelSchema = new Schema(
  {
    title: {
      type: String,
      min: 10,
      max: 50,
      required: true,
      validate: {
        validator(v) {
          return /^[a-zA-Z0-9.-]*$/.test(v);
        },
        message: props => `${props.value} is not a valid title!`,
      },
    },
    description: {
      type: String,
      validate: {
        validator(v) {
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
      required: true,
      min: 1,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'modified',
    },
  }
);

module.exports = mongoose.model('Advert', advertModelSchema);
