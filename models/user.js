const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModelSchema = new Schema({
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
        return /\+375 29 2\d{2} \d{2} \d{2}/.test(v);
      },
      message: props => `${props.value} is not a valid phone!`,
    },
  },
});

// Export model.
module.exports = mongoose.model('User', userModelSchema);
