import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (token) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTasks(response.data);
        } catch (error) {
          toast.error('Failed to fetch tasks');
        }
      };
      fetchTasks();
    }
  }, [token]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Management System</h1>
      {token ? (
        <>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
          </Button>
          <TaskForm onNewTask={(newTask) => setTasks([...tasks, newTask])} />
          <TaskTable
            tasks={tasks}
            onTaskUpdate={(id, status) =>
              setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)))
            }
            onTaskDelete={(id) => setTasks(tasks.filter((task) => task.id !== id))}
          />
        </>
      ) : (
        <>
          {showRegister ? (
            <RegisterForm onRegister={() => setShowRegister(false)} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
          <Button
            onClick={() => setShowRegister(!showRegister)}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            {showRegister ? 'Already have an account? Login' : 'Create a new account'}
          </Button>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;