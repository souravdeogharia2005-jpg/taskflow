const express = require('express');
const router = express.Router();
const {
  getAllTasks, getTaskById, createTaskHandler,
  updateTaskHandler, deleteTaskHandler, toggleTaskHandler,
} = require('../controllers/taskController.js');

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTaskHandler);
router.put('/:id', updateTaskHandler);
router.delete('/:id', deleteTaskHandler);
router.patch('/:id/toggle', toggleTaskHandler);

module.exports = router;
