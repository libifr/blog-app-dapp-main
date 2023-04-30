const express = require('express');
const userController = require('../controllers/user-controller');
const { auth, restrictTo } = require('../middlewares');

const router = express.Router();

router.get('/profile', auth, userController.getMyProfile);
router.patch('/profile', auth, userController.updateMyProfile);

router.use([auth, restrictTo('Admin')]);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.updateOneUser)
  .delete(userController.deleteOneUser);

module.exports = router;
