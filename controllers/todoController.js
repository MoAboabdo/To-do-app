import Todo from '../models/todoModel.js';

// @route     POST api/todo
// @desc      Create todo
// @access    Private
const addTodo = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    const newTodo = new Todo({
      title,
      description,
      isCompleted,
      user: req.user._id,
    });

    const todo = await newTodo.save();

    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @route     PUT api/todo/:id
// @desc      Update todo
// @access    Private
const updateTodo = async (req, res) => {
  const { title, description, isCompleted } = req.body;

  const todoFields = {};
  if (title) todoFields.title = title;
  if (description) todoFields.description = description;
  if (isCompleted) todoFields.isCompleted = isCompleted;
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns todo
    if (todo.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: todoFields },
      { new: true }
    );

    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// @route     DELETE api/todo/:id
// @desc      Delete todo
// @access    Private

const deleteTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ msg: 'Todo not found' });

    // Make sure user owns contact
    if (todo.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Todo.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route     GET api/todos
// @desc      Get all to do for specific user
// @access    Private

const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.i_d });
    res.json(todos);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route     GET api/todo/:id
// @desc      Get to do information for specific user
// @access    Private
const getTodoInfo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Make sure user owns contact
    if (todo.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(todo);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export { addTodo, updateTodo, deleteTodo, getAllTodo, getTodoInfo };
