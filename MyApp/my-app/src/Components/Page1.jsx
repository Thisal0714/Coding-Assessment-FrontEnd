import { useState, useEffect } from "react";
import axios from "axios";
import './Page1Style.css';


export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [completedtasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    fetchTasks();
    fetchCompletedTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getActiveTasks");
  
      
      const fetchedTasks = Array.isArray(response.data.doLists) ? response.data.doLists : [];
  
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]); 
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getCompletedTasks");
  
      
      const fetchedCompletedTasks = Array.isArray(response.data.doLists) ? response.data.doLists : [];
  
      setCompletedTasks(fetchedCompletedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setCompletedTasks([]); 
    }
  };
  

  const addTask = async () => {
    if (!newTask.title.trim()) return;
    try {
      await axios.post("http://localhost:8080/addTask", newTask);
      setNewTask({ title: "", description: "", dueDate: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.put(`http://localhost:8080/update-status/${id}`, {
        status: "COMPLETED"
      });
      fetchCompletedTasks();
      fetchTasks(); // Assuming this refreshes the task list
    } catch (error) {
      console.error("Error completing task:", error);
    }
};


  const deleteTask = async (title) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${title}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
      <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.title}>
            <span className={task.completed ? "completed" : ""}>
              {task.title} - {task.description} - {task.dueDate}
            </span>
            <div className="action">
              {!task.completed && (
                <span className="complete" onClick={() => completeTask(task.title)}>
                  ✅
                </span>
              )}
              <span className="delete" onClick={() => deleteTask(task.title)}>
                ❌
              </span>
            </div>
          </li>
        ))}
      </ul>
      <h1>Completed Tasks</h1>
      <ul>
        {completedtasks.map((task) => (
          <li key={task.title}>
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div> 
    
  );
}
