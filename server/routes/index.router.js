const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/createComment',jwtHelper.verifyJwtToken, ctrlUser.createCom);
router.get('/allComments', ctrlUser.getAllCom);
router.get('/myComments',jwtHelper.verifyJwtToken, ctrlUser.getMyCom);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;