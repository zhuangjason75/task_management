import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ onNewTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', {
        title,
        description,
        category,
        assignedTo,
        status: 'Pending',
      });
      onNewTask(response.data);
      toast.success('Task added successfully!');
      setTitle('');
      setDescription('');
      setCategory('');
      setAssignedTo('');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Assigned To</InputLabel>
        <Select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          label="Assigned To"
        >
          <MenuItem value="User1">User 1</MenuItem>
          <MenuItem value="User2">User 2</MenuItem>
          <MenuItem value="User3">User 3</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;