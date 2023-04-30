const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const authRouter = require('./router/authRoutes');
const postRouter = require('./router/postRoutes');
const commentRouter = require('./router/commentRoutes');
const userRouter = require('./router/userRoutes');
const statsRouter = require('./router/statsRoutes');
const globalErrorHandler = require('./controllers/error-controller');

const app = express();

app.enable('trust proxy');
app.use(cors());
app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/users', userRouter);
app.use('/api/stats', statsRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
