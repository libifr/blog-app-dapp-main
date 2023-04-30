const express = require('express');
const statsController = require('../controllers/stats-controller');
const { auth, restrictTo } = require('../middlewares');

const router = express.Router();

router.get(
  '/',
  [auth, restrictTo('Admin', 'Author')],
  statsController.getStats
);

module.exports = router;
