const _ = require('lodash');
const {
  User,
  validateUser,
  validateUserUpdate
} = require('../models/user-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private(Admin)
 */
const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find().sort({ createdAt: -1 });

  res.status(200).json(allUsers);
});

/**
 * @desc    Get single user
 * @route   GET /api/users/id
 * @access  Private(Admin)
 */
const getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('No user found with this id.', 404));

  res.status(200).json(user);
});

/**
 * @desc    Create new user
 * @route   POST /api/users
 * @access  Private(Admin)
 */
const createNewUser = catchAsync(async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, [
    'name',
    'email',
    'password',
    'avatar',
    'role'
  ]);

  const newUser = await User.create(payload);

  res.status(201).json({
    status: 'success',
    result: newUser
  });
});

/**
 * @desc    Update single user
 * @route   PATCH /api/users/id
 * @access  Private(Admin)
 */
const updateOneUser = catchAsync(async (req, res, next) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ['name', 'email', 'avatar', 'role']);

  const updateUser = await User.findByIdAndUpdate(req.params.id, payload, {
    new: true
  });

  if (!updateUser)
    return next(new AppError('No user found with this id.', 404));

  res.status(200).json({
    status: 'success',
    result: updateUser
  });
});

/**
 * @desc    Delete single user
 * @route   PATCH /api/users/id
 * @access  Private(Admin)
 */
const deleteOneUser = catchAsync(async (req, res, next) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  if (!deleteUser)
    return next(new AppError('No user found with this id.', 404));

  res.status(204).send();
});

/**
 * @desc    Get my profile
 * @route   POST /api/users/profile
 * @access  Private
 */
const getMyProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json(user);
});

/**
 * @desc    Get my profile
 * @route   POST /api/users/profile
 * @access  Private
 */
const updateMyProfile = catchAsync(async (req, res, next) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ['name', 'email', 'avatar']);
  const user = await User.findByIdAndUpdate(req.user._id, payload, {
    new: true
  });

  res.status(200).json({
    status: 'success',
    result: user
  });
});

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getMyProfile,
  updateMyProfile
};
