const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/create', formController.createForm);
router.get('/unrelated/:userId', formController.getFormsWithoutUser);
router.get('/get', formController.getAllForms);
router.get('/stats/:id', formController.getStatsForm);
router.get('/get/:id/user/:userId', formController.getFormByUser);

module.exports = router;