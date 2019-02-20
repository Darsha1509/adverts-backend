const Boom = require('boom');
const Advert = require('../models/advert');
const User = require('../models/user');

exports.createAdvert = async function createAdvert(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (!user) {
      return next(Boom.notFound());
    }
    const advert = new Advert(req.body);
    advert.author = user.id;
    user.adverts.push(advert.id);
    await advert.save();
    await await User.findByIdAndUpdate(user.id, { $set: user }, { new: true });
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
    const adverts = await Advert.find(query)
      .sort(sort)
      .populate({ path: 'author', select: ['username', 'phone', 'email'] });
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
    await Advert.findByIdAndUpdate(advertId, { $inc: { views: 1 } });
    return res.json({ advert });
  } catch (e) {
    return next(e);
  }
};

exports.updateAdvert = async function updateAdvert(req, res, next) {
  try {
    const advert = await Advert.findById(req.params.id);
    if ((await advert.author).toString() !== req.user.id) {
      const error = new Error('Forbidden');
      Boom.boomify(error, { statusCode: 403 });

      return next(error);
    }

    if (req.body.views) {
      delete req.body.views;
    }

    const updatedAdvert = await Advert.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedAdvert) {
      return next(Boom.notFound());
    }
    return res.json({ updatedAdvert });
  } catch (e) {
    return next(e);
  }
};

exports.deleteAdvert = async function deleteAdvert(req, res, next) {
  try {
    const advert = await Advert.findById(req.params.id);
    if ((await advert.author).toString() !== req.user.id) {
      const error = new Error('Forbidden');
      Boom.boomify(error, { statusCode: 403 });

      return next(error);
    }
    const deletedAdvert = await Advert.findByIdAndRemove(req.params.id);
    if (!deletedAdvert) {
      return next(Boom.notFound());
    }
    const adverts = await Advert.find().populate({
      path: 'author',
      select: ['username', 'phone', 'email'],
    });
    return res.json({ adverts });
  } catch (e) {
    return next(e);
  }
};
