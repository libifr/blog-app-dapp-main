const _ = require('lodash');
const {
  Post,
  validatePost,
  validatePostUpdate
} = require('../models/post-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all posts
 * @route   GET /api/posts
 * @access  Private(Admin, Author)
 */
const getAllPosts = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'Admin' ? {} : { user: req.user._id };

  const allPosts = await Post.find(filter).sort({ createdAt: -1 });

  res.status(200).json(allPosts);
});

/**
 * @desc    Get single post
 * @route   GET /api/posts/id
 * @access  Private(Admin, Author)
 */
const getOnePost = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'Admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user._id };

  const post = await Post.findOne(filter);
  if (!post) return next(new AppError('No post found with this id.', 404));

  res.status(200).json(post);
});

/**
 * @desc    Create new post
 * @route   POST /api/posts
 * @access  Private(Admin, Author)
 */
const createNewPost = catchAsync(async (req, res, next) => {
  const { error } = validatePost(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  req.body.user = req.user._id;

  const payload = _.pick(req.body, [
    'title',
    'content',
    'image',
    'user',
    'metadata',
    'receivedAddress',
    'amount'
  ]);

  const newPost = await Post.create(payload);
  newPost.paidUsers.push(req.user._id);
  await newPost.save();

  res.status(201).json({
    status: 'success',
    result: newPost
  });
});

/**
 * @desc    Update single post
 * @route   PATCH /api/posts/id
 * @access  Private(Admin, Author)
 */
const updateOnePost = catchAsync(async (req, res, next) => {
  const { error } = validatePostUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const filter =
    req.user.role === 'Admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user._id };

  const payload = _.pick(req.body, [
    'title',
    'content',
    'image',
    'status',
    'metadata',
    'receivedAddress',
    'amount'
  ]);

  //delete status if user is not admin
  if (req.user.role !== 'Admin') delete payload.status;

  const updatePost = await Post.findOneAndUpdate(filter, payload, {
    new: true
  });
  if (!updatePost)
    return next(new AppError('No post found with this id.', 404));

  res.status(200).json({
    status: 'success',
    result: updatePost
  });
});

/**
 * @desc    Delete single post
 * @route   PATCH /api/posts/id
 * @access  Private(Admin, Author)
 */
const deleteOnePost = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'Admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user._id };

  const deletePost = await Post.findOneAndDelete(filter);
  if (!deletePost)
    return next(new AppError('No post found with this id.', 404));

  res.status(204).send();
});

/**
 * @desc    Get all approved posts
 * @route   GET /api/posts/approved
 * @access  Private
 */
const getApprovedPosts = catchAsync(async (req, res, next) => {
  const allPosts = await Post.find({ status: 'Approved' }).sort({
    createdAt: -1
  });

  // only send 200 characters of content
  allPosts.forEach((post) => {
    post.content = post.content.substring(0, 200);
  });

  res.status(200).json(allPosts);
});

/**
 * @desc    Get single approved post
 * @route   GET /api/posts/approved/id
 * @access  Private
 */
const getOneApprovedPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    _id: req.params.id,
    status: 'Approved'
  });

  if (!post) return next(new AppError('No post found with this id.', 404));

  // if current user id is not in paidUsers array, send post with isPaid is false, Otherwise send 200 characters of content
  let isPaid;
  const user = post.paidUsers?.find((user) => user.toString() === req.user._id);
  if (!user) {
    post.content = post.content.substring(0, 500);
    isPaid = false;
  } else {
    isPaid = true;
  }

  // send post with populated comments and isPaid
  return res.status(200).json({
    ...post._doc,
    comments: post.comments.sort((a, b) => b.date - a.date),
    isPaid
  });
});

/**
 * @desc    Pay for post
 * @route   POST /api/posts/paid/id
 * @access  Private
 */
const updatePaidUsers = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError('No post found with this id.', 404));

  const user = post.paidUsers?.find((user) => user.toString() === req.user._id);
  if (user)
    return next(new AppError('You have already paid for this post.', 400));

  post.paidUsers.push(req.user._id);
  await post.save();

  res.status(200).json(post);
});

module.exports = {
  getAllPosts,
  getOnePost,
  createNewPost,
  updateOnePost,
  deleteOnePost,
  updatePaidUsers,
  getApprovedPosts,
  getOneApprovedPost
};
