const express = require('express');
const router = express.Router();
const userFormController = require('../controllers/userFormController');

router.post('/create', userFormController.createUserForm);
router.put('/update', userFormController.updateUserForm);

module.exports = router;