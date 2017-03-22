const express = require('express');
const WordController = require('../controllers/WordController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({word:'this is working'});
});

router.get('/:param', WordController.show);

module.exports = router;