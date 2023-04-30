const { User, validateUser } = require('../models/user-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = catchAsync(async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const { name, email, password, avatar, role } = req.body;

  const isAlreadyExists = await User.findOne({ email });
  if (isAlreadyExists) {
    return next(new AppError('Email address already exists.', 400));
  }

  const user = new User({
    name,
    email,
    password,
    avatar,
    role
  });

  const newUser = await user.save();
  const token = newUser.generateAuthToken();

  res.status(201).json({
    status: 'success',
    token
  });
});

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Email and password is required.', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  const isMatch = await user?.correctPassword(password, user.password);
  if (!isMatch) {
    throw new AppError('Incorrect email or password.', 401);
  }

  const token = user.generateAuthToken();

  res.status(200).json({
    status: 'success',
    token
  });
});

module.exports = {
  register,
  login
};
