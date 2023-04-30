const express = require('express');
const commentController = require('../controllers/comment-controller');
const { auth, restrictTo } = require('../middlewares');

const router = express.Router();

router.post('/', auth, commentController.createNewComment);

router.use([auth, restrictTo('Admin')]);

router.get('/', commentController.getAllComments);

router
  .route('/:id')
  .get(commentController.getOneComment)
  .patch(commentController.updateOneComment)
  .delete(commentController.deleteOneComment);

module.exports = router;
