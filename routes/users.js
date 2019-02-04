const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// login
router.post('/login', userController.login);

// create user
router.post('/users', userController.createUser);

// get users
router.get('/users', userController.getUsers);

// get user
router.get('/users/:id', userController.getUser);

// change user's data
router.patch('/users/:id', userController.updateUser);

// delete user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
