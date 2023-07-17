import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import todos from './data/todos.js';
import User from './models/userModel.js';
import Todo from './models/todoModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Todo.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    for (let i = 0; i <= createdUsers.length; i++) {
      const sampleTodos = todos.map(todo => {
        return { ...todo, user: createdUsers[i] };
      });
      await Todo.insertMany(sampleTodos);
    }

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Todo.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
