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
          return /^[a-zA-Z0-9. -]*$/.test(v);
        },
        message: props => `${props.value} is not a valid title!`,
      },
    },
    description: {
      type: String,
      validate: {
        validator(v) {
          return /^[a-zA-Z0-9. -]*$/.test(v);
        },
        message: props => `${props.value} is not a valid description!`,
      },
    },
    category: {
      type: String,
      enum: [
        'The property',
        'Auto and transport',
        'Equipment',
        'Fashion and Style',
        'Everything for children and mothers',
        'Housing',
        'Repair and construction',
        'Garden',
        'Hobby, sport and tourism',
        'Wedding, bussiness and study',
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
    views: {
      type: Number,
      default: 0,
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
