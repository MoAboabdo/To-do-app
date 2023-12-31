import express from 'express';
const router = express.Router();

import auth from '../middleware/authMiddleware.js';

import {
  addTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  getTodoInfo,
} from '../controllers/todoController.js';

router.post('/todo', auth, addTodo);

router.put('/todo/:id', auth, updateTodo);

router.delete('/todo/:id', auth, deleteTodo);

router.get('/todos', auth, getAllTodo);

router.get('/todo/:id', auth, getTodoInfo);

export default router;
