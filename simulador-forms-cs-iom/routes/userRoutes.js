const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.createUser);
router.post('/login', userController.login);
router.get('/get/by/type/:typeuser', userController.getUsersByType);
router.get('/get/user/with/forms/:id', userController.getUserWithForms);

module.exports = router;