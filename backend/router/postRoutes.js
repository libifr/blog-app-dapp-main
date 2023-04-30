const express = require('express');
const postController = require('../controllers/post-controller');
const { auth, restrictTo } = require('../middlewares');

const router = express.Router();

router.get('/approved', postController.getApprovedPosts);
router.get('/approved/:id', auth, postController.getOneApprovedPost);
router.post('/paid/:id', auth, postController.updatePaidUsers);

router.use([auth, restrictTo('Admin', 'Author')]);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createNewPost);

router
  .route('/:id')
  .get(postController.getOnePost)
  .patch(postController.updateOnePost)
  .delete(postController.deleteOnePost);

module.exports = router;
