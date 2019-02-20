const express = require('express');
const advertController = require('../controllers/advertController');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/adverts', authentication, advertController.createAdvert);

router.get('/adverts', advertController.getAdverts);

router.get('/adverts/:id', advertController.getAdvert);

router.patch('/adverts/:id', authentication, advertController.updateAdvert);

router.delete('/adverts/:id', authentication, advertController.deleteAdvert);

module.exports = router;
