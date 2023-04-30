const _ = require('lodash');
const {
  Comment,
  validateComment,
  validateCommentUpdate
} = require('../models/comment-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all comments
 * @route   GET /api/comments
 * @access  Private(Admin)
 */
const getAllComments = catchAsync(async (req, res, next) => {
  const allComments = await Comment.find().sort({ createdAt: -1 });

  res.status(200).json(allComments);
});

/**
 * @desc    Get single comment
 * @route   GET /api/comments/id
 * @access  Private(Admin)
 */
const getOneComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment)
    return next(new AppError('No comment found with this id.', 404));

  res.status(200).json(comment);
});

/**
 * @desc    Create new comment
 * @route   POST /api/comments
 * @access  Private
 */
const createNewComment = catchAsync(async (req, res, next) => {
  const { error } = validateComment(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  req.body.user = req.user._id;

  const payload = _.pick(req.body, ['post', 'comment', 'user']);

  const newComment = await Comment.create(payload);

  res.status(201).json(newComment);
});

/**
 * @desc    Update single comment
 * @route   PATCH /api/comments/id
 * @access  Private(Admin)
 */
const updateOneComment = catchAsync(async (req, res, next) => {
  const { error } = validateCommentUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ['comment']);

  const updateComment = await Comment.findByIdAndUpdate(
    req.params.id,
    payload,
    {
      new: true
    }
  );

  if (!updateComment)
    return next(new AppError('No comment found with this id.', 404));

  res.status(200).json(updateComment);
});

/**
 * @desc    Delete single comment
 * @route   PATCH /api/comments/id
 * @access  Private(Admin)
 */
const deleteOneComment = catchAsync(async (req, res, next) => {
  const deleteComment = await Comment.findByIdAndDelete(req.params.id);
  if (!deleteComment)
    return next(new AppError('No comment found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllComments,
  getOneComment,
  createNewComment,
  updateOneComment,
  deleteOneComment
};
