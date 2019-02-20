const express = require('express');
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication')

const router = express.Router();

router.post('/login', userController.login);

router.post('/logout', authentication, userController.logout);

router.post('/users', userController.createUser);

router.get('/users', userController.getUsers);

router.get('/users/:id', userController.getUser);

router.patch('/users/:id', authentication, userController.updateUser);

router.delete('/users/:id', authentication, userController.deleteUser);

module.exports = router;
