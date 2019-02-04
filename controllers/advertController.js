const Boom = require('boom');
const Advert = require('../models/advert');
const User = require('../models/user');

// создать объявление
exports.createAdvert = function createAdvert(req, res, next) {
  res.send('NOT IMPLEMENTED: Create advert');
};

// получить список объявлений
exports.getAdverts = async function getAdverts(req, res, next) {
  try {
    const adverts = await Advert.find();
    return res.json({ adverts });
  } catch (e) {
    Boom.boomify(e, { statusCode: 404 });
    return next(e);
  }
};

// получить объявление по идентификатору с данными автора
exports.getAdvert = async function getAdvert(req, res, next) {
  try {
    const advertId = req.params.id;
    const advert = await Advert.findById(advertId);
    const user = await User.findById(advert.author);
    return res.json({ advert, user });
  } catch (e) {
    Boom.boomify(e, { statusCode: 404 });
    return next(e);
  }
};

// изменить объявление
exports.updateAdvert = async function updateAdvert(req, res, next) {
  res.send('NOT IMPLEMENTED: Update advert');
};

// удалить объявление
exports.deleteAdvert = async function deleteAdvert(req, res, next) {
  try {
    const advertId = req.params.id;
    const advert = await Advert.deleteOne({ _id: advertId });
    return res.json({ advert });
  } catch (e) {
    Boom.boomify(e, { statusCode: 404 });
    return next(e);
  }
};
