const express = require('express');
const router = express.Router();
const {all, one} = require('../controllers/categoryController');

router.get('/', all);
router.get('/:id', one);

module.exports = router