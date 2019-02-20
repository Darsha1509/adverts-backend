const Boom = require('boom');
const hashPassword = require('../services/hashPassword');
const generateToken = require('../services/generateToken');
const User = require('../models/user');

exports.login = async function login(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.sendStatus(400);
  }
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.sendStatus(401);
    }
    if (user.hashedPassword === (await hashPassword(password))) {
      const token = await generateToken(user.id);
      user.tokens.push(token);
      await User.findByIdAndUpdate(user.id, { $set: user }, { new: true });
      return res.send(user);
    }
    return next(Boom.notFound());
  } catch (err) {
    return res.sendStatus(500);
  }
};

exports.logout = async function login(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    const token = req.headers.authentication;
    user.tokens.forEach((tokenItem, index, tokens) => {
      if (tokenItem === token) {
        tokens.splice(index, 1);
      }
    });
    await User.findByIdAndUpdate(user.id, { $set: user }, { new: true });
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
};

exports.createUser = async function createUser(req, res, next) {
  try {
    const user = new User(req.body);
    await user.save();
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
};

exports.getUsers = async function getUsers(req, res, next) {
  try {
    const users = await User.find().populate({ path: 'adverts', select: 'title' });
    if (!users) {
      return next(Boom.notFound());
    }
    return res.json({ users });
  } catch (e) {
    return next(e);
  }
};

exports.getUser = async function getUser(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('adverts');
    if (!user) {
      return next(Boom.notFound());
    }
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
};

exports.updateUser = async function updateUser(req, res, next) {
  try {
    if (req.user.id === req.params.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedUser) {
        return next(Boom.notFound());
      }
      return res.json({ updatedUser });
    }
    return next(new Error('Error during updating'));
  } catch (e) {
    return next(e);
  }
};

exports.deleteUser = async function deleteUser(req, res, next) {
  try {
    if (req.user.id === req.params.id) {
      const deletedUser = await User.findByIdAndRemove(req.params.id);
      if (!deletedUser) {
        return next(Boom.notFound());
      }
      const users = await User.find().populate({ path: 'adverts', select: 'title' });
      return res.json({ users });
    }
    return next(new Error('Error during deleting'));
  } catch (e) {
    return next(e);
  }
};
