const { User } = require('../models/user-model');
const { Post } = require('../models/post-model');
const { Comment } = require('../models/comment-model');
const catchAsync = require('../utils/catch-async');

/**
 * @desc    Get user posts and comments stats
 * @route   GET /api/stats
 * @access  Private(Admin, Author)
 */

const getStats = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'Admin' ? {} : { user: req.user._id };
  const totalUsers = await User.countDocuments();
  const totalPosts = await Post.countDocuments(filter);
  const totalComments = await Comment.countDocuments();
  const totalPendingPosts = await Post.countDocuments({
    ...filter,
    status: 'Pending'
  });

  res.status(200).json({
    totalUsers,
    totalPosts,
    totalComments,
    totalPendingPosts
  });
});

module.exports = {
  getStats
};
