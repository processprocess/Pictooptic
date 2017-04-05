const express = require('express');
const IconController = require('../controllers/IconController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({icon:'this is working'});
})

router.get('/:param', IconController.show);

module.exports = router;