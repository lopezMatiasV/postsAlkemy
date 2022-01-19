const express = require('express');
const router = express.Router();
const {all, one, add, edit, destroy} = require('../controllers/postController');

router.get('/', all);
router.get('/:id', one);
router.post('/',add);
router.patch('/:id', edit);
router.delete('/:id', destroy)

module.exports = router