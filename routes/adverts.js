const express = require('express');
const advertController = require('../controllers/advertController');

const router = express.Router();

// create advert
router.post('/adverts', advertController.createAdvert);

// get adverts
router.get('/adverts', advertController.getAdverts);

// get advert
router.get('/adverts/:id', advertController.getAdvert);

// change advert
router.patch('/adverts/:id', advertController.updateAdvert);

// delete advert
router.delete('/adverts/:id', advertController.deleteAdvert);

module.exports = router;
