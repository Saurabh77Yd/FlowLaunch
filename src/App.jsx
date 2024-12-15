/*import { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import AddTaskForm from './components/AddTaskForm';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const data = response.data.slice(0, 20).map(task => ({
          id: task.id,
          title: task.title,
          description: `Task Description for ${task.title}`,
          status: task.completed ? 'Done' : 'To Do',
        }));
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Update a task
  const updateTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Filter tasks
  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter(task => task.status === filter);

  return (
    <div>
      <h1>Task List Manager</h1>
      <AddTaskForm onAddTask={addTask} />
      <div>
        <label>Filter by Status: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <TaskTable
        tasks={filteredTasks}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default App;*/

import { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import AddTaskForm from './components/AddTaskForm';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const data = response.data.slice(0, 20).map(task => ({
          id: task.id,
          title: task.title,
          description: `Task Description for ${task.title}`,
          status: task.completed ? 'Done' : 'To Do',
        }));
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Update a task
  const updateTask = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  // Filter tasks by status and search query
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter === 'All' || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // return (
  //   <div>
  //     <h1>Task List Manager</h1>
  //     <AddTaskForm onAddTask={addTask} />
      
  //     <div>
  //       <label>Search: </label>
  //       <input
  //         type="text"
  //         placeholder="Search by Title or Description"
  //         value={searchQuery}
  //         onChange={(e) => setSearchQuery(e.target.value)}
  //       />
  //     </div>

  //     <div>
  //       <label>Filter by Status: </label>
  //       <select onChange={(e) => setFilter(e.target.value)} value={filter}>
  //         <option value="All">All</option>
  //         <option value="To Do">To Do</option>
  //         <option value="In Progress">In Progress</option>
  //         <option value="Done">Done</option>
  //       </select>
  //     </div>

  //     <TaskTable
  //       tasks={filteredTasks}
  //       onUpdateTask={updateTask}
  //       onDeleteTask={deleteTask}
  //     />
  //   </div>
  // );
  return(
    <div className="center-container">
  <h1>Task List Manager</h1>
  <AddTaskForm onAddTask={addTask} />

  <div className="input-section search-bar">
    <label>Search: </label>
    <input
      type="text"
      placeholder="Search by Title or Description"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  <div className="input-section filter-bar">
    <label>Filter by Status: </label>
    <select onChange={(e) => setFilter(e.target.value)} value={filter}>
      <option value="All">All</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  </div>

  <TaskTable
    tasks={filteredTasks}
    onUpdateTask={updateTask}
    onDeleteTask={deleteTask}
  />
</div>

  )
};

export default App;
