const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    metadata: {
      tags: {
        type: [String],
        required: true
      },
      duration: {
        type: String,
        required: true
      }
    },
    // list of users who payment for this post to access
    paidUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    receivedAddress: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email avatar'
  });

  next();
});

postSchema.pre(/^findOne/, function (next) {
  this.populate('comments', 'comment user date');

  next();
});

const validatePost = (post) => {
  const schema = Joi.object({
    title: Joi.string().required().label('Title'),
    content: Joi.string().required().label('Content'),
    image: Joi.string().label('Image'),
    date: Joi.date().label('Date'),
    status: Joi.string().label('Status'),
    metadata: Joi.object({
      tags: Joi.array().required().label('Tags'),
      duration: Joi.string().required().label('Duration')
    }).label('Metadata'),
    receivedAddress: Joi.string().required().label('Received Address'),
    amount: Joi.number().required().label('Amount')
  });

  return schema.validate(post);
};

const validatePostUpdate = (post) => {
  const schema = Joi.object({
    title: Joi.string().label('Title'),
    content: Joi.string().label('Content'),
    image: Joi.string().label('Image'),
    status: Joi.string().label('Status'),
    metadata: Joi.object({
      tags: Joi.array().label('Tags'),
      duration: Joi.string().label('Duration')
    }).label('Metadata'),
    receivedAddress: Joi.string().label('Received Address'),
    amount: Joi.number().label('Amount')
  });

  return schema.validate(post);
};

const Post = model('Post', postSchema);

module.exports = {
  Post,
  validatePost,
  validatePostUpdate
};
