const express = require('express');

const router = express.Router();

// create advert
router.post('/adverts', (req, res) => {
  // TODO
});

// get adverts
router.get('/adverts', (req, res) => {
  // TODO
});

// get advert
router.get('/adverts/:id', (req, res) => {
  let advertId = req.params.id;
  // TODO
});

// change advert
router.patch('/adverts/:id', (req, res) => {
  let advertId = req.params.id;
  // TODO
});

// delete advert
router.delete('/advert/:id', (req, res) => {
  let advertId = req.params.id;
  // TODO
});

module.exports = router;
