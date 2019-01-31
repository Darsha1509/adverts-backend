const express = require('express');

const router = express.Router();

// create user
router.post('/users', (req, res) => {
  // TODO
});

// get users
router.get('/users', (req, res) => {
  // TODO
});

// get user
router.get('/users/:id', (req, res) => {
  let id = req.params.id;
  // TODO
});

// change user's data
router.patch('/users/:id', (req, res) => {
  let id = req.params.id;
  // TODO
});

// delete user
router.delete('/users/:id', (req, res) => {
  let id = req.params.id;
  // TODO
});

module.exports = router;
