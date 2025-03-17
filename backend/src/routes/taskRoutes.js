const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/tasks', auth(), taskController.getAllTasks);
router.post('/tasks', auth(['user', 'admin']), taskController.createTask);
router.put('/tasks/:id', auth(['user', 'admin']), taskController.updateTask);
router.delete('/tasks/:id', auth(['admin']), taskController.deleteTask);

module.exports = router;