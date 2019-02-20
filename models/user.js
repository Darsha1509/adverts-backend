const crypto = require('crypto');
const util = require('util');
const config = require('getconfig');
const hashPassword = require('../services/hashPassword');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModelSchema = new Schema(
  {
    username: {
      type: String,
      min: 4,
      max: 20,
      unique: true,
      required: true,
      validate: {
        validator(v) {
          return /^[a-zA-Z0-9.-]*$/.test(v);
        },
        message: props => `${props.value} is not a valid username!`,
      },
    },
    hashedPassword: {
      type: String,
      minlength: 8,
      alias: 'password',
    },
    firstName: {
      type: String,
      min: 2,
      max: 20,
      validate: {
        validator(v) {
          return /^[a-zA-Z]*$/.test(v);
        },
        message: props => `${props.value} is not a valid firstName!`,
      },
    },
    lastName: {
      type: String,
      min: 2,
      max: 20,
      validate: {
        validator(v) {
          return /^[a-zA-Z]*$/.test(v);
        },
        message: props => `${props.value} is not a valid lastName!`,
      },
    },
    email: {
      type: String,
      min: 3,
      max: 30,
      unique: true,
      required: true,
      validate: {
        validator(v) {
          return /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      validate: {
        validator(v) {
          return /^\+375 \d{2} \d{3} \d{2} \d{2}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone!`,
      },
    },
    adverts: [{ type: Schema.Types.ObjectId, ref: 'Advert' }],
    tokens: {
      type: Array,
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'modified',
    },
    toJSON: {
      transform(doc, ret) {
        return ret;
        const { hashedPassword, __v, ...newRet } = ret;
        return newRet;
      },
    },
  }
);

userModelSchema.pre('save', async function preSave() {
  this.hashedPassword = await hashPassword(this.hashedPassword);
});

// Export model.
module.exports = mongoose.model('User', userModelSchema);
