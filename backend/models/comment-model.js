const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email avatar'
  });

  this.populate({
    path: 'post',
    select: 'title -user'
  });

  next();
});

const validateComment = (comment) => {
  const schema = Joi.object({
    user: Joi.string().label('User'),
    post: Joi.string().required().label('Post'),
    comment: Joi.string().required().label('Comment'),
    date: Joi.date().label('Date')
  });

  return schema.validate(comment);
};

const validateCommentUpdate = (comment) => {
  const schema = Joi.object({
    comment: Joi.string().label('Comment')
  });

  return schema.validate(comment);
};

const Comment = model('Comment', commentSchema);

module.exports = {
  Comment,
  validateComment,
  validateCommentUpdate
};
