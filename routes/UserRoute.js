const express = require('express');
const userController = require('../controller/UserController');

const router = express.Router();

router.post('/registerUser', userController.registerUser);
router.put('/updateUserWithExpense', userController.updateUserWithExpenses);
router.get('/login', userController.login);
router.get('/getUserExpenses/:email', userController.getAllUserExpenses);


module.exports = router;