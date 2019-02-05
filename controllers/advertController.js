const Boom = require('boom');
const Advert = require('../models/advert');
const User = require('../models/user');

exports.createAdvert = async function createAdvert(req, res, next) {
  try {
    const user = await User.findById(req.body.author);
    if (!user) {
      return next(Boom.notFound());
    }
    const advert = new Advert(req.body);
    user.adverts.push(advert.id);
    await advert.save();
    await user.save();
    return res.json({ advert });
  } catch (e) {
    next(e);
  }
};

exports.getAdverts = async function getAdverts(req, res, next) {
  try {
    const query = {};
    const sort = {};

    if (req.query.title) {
      query.title = req.query.title;
    }

    if (req.query.description) {
      query.description = new RegExp(req.query.description, 'i');
    }
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.sort) {
      const fields = req.query.sort.split(',');
      fields.forEach(field => {
        if (field.startsWith('-')) {
          sort[field.slice(1)] = -1;
        } else {
          sort[field.slice(0)] = 1;
        }
      });
    }
    const adverts = await Advert.find(query).sort(sort);
    return res.json({ adverts });
  } catch (e) {
    return next(e);
  }
};

exports.getAdvert = async function getAdvert(req, res, next) {
  try {
    const advertId = req.params.id;
    const advert = await Advert.findById(advertId).populate('author');
    if (!advert) {
      return next(Boom.notFound());
    }
    const view = advert.views;
    advert.views = view + 1;
    advert.save();
    return res.json({ advert });
  } catch (e) {
    return next(e);
  }
};

exports.updateAdvert = async function updateAdvert(req, res, next) {
  try {
    const query = { _id: req.params.id };
    const advert = await Advert.findById(req.params.id);
    if (!advert) {
      return next(Boom.notFound());
    }
    await Advert.findOneAndUpdate(query, { $set: req.body });
    const updatedAdvert = await Advert.findById(req.params.id);
    return res.json({ updatedAdvert });
  } catch (e) {
    return next(e);
  }
};

exports.deleteAdvert = async function deleteAdvert(req, res, next) {
  try {
    const advertId = req.params.id;
    const advert = await Advert.findById(advertId);
    if (!advert) {
      return next(Boom.notFound());
    }
    await Advert.findOneAndRemove({ _id: advertId });
    return res.json({ advert });
  } catch (e) {
    return next(e);
  }
};
