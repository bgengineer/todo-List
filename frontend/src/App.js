// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/work');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Function to add a new todo
  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:3000/work', {
        work: newTodo,
        completed: false
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Function to handle todo completion
  const toggleTodoCompletion = async (_id) => {
    try {
      const response = await axios.put(`http://localhost:3000/work/${_id}`, {
        completed: !todos.find(todo => todo._id === _id).completed
      });
      setTodos(todos.map(todo => todo._id === _id ? response.data : todo));
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  // Function to delete a todo
  const deleteTodo = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/work/${_id}`);
      setTodos(todos.filter(todo => todo._id !== _id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo._id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            className="todo-item"
          >
            <span onClick={() => toggleTodoCompletion(todo._id)}>{todo.work}</span>
            <button onClick={() => deleteTodo(todo._id)} className="delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
