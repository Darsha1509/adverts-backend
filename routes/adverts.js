const express = require('express');
const advertController = require('../controllers/advertController');

const router = express.Router();

router.post('/adverts', advertController.createAdvert);

router.get('/adverts', advertController.getAdverts);

router.get('/adverts/:id', advertController.getAdvert);

router.patch('/adverts/:id', advertController.updateAdvert);

router.delete('/adverts/:id', advertController.deleteAdvert);

module.exports = router;
