const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    avatar: {
      type: String,
      default: 'https://avatars.githubusercontent.com/u/56452822'
    },
    role: {
      type: String,
      enum: ['User', 'Admin', 'Author'],
      default: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Pre save hook that hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Return true if password is correct, otherwise return false
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      role: this.role
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(4).max(20).required().label('Password'),
    avatar: Joi.string().label('Avatar'),
    role: Joi.string().label('Role')
  });

  return schema.validate(user);
};

const validateUserUpdate = (user) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    email: Joi.string().email().label('Email'),
    avatar: Joi.string().label('Avatar'),
    role: Joi.string().label('Role')
  });

  return schema.validate(user);
};

const User = model('User', userSchema);

module.exports = {
  User,
  validateUser,
  validateUserUpdate
};
