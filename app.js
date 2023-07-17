import express from 'express';
import connectDB from './config/db.js';
import colors from 'colors';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoute from './routes/users.js';
import todoRoute from './routes/todos.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', userRoute);
app.use('/api', todoRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
