/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaEdit, FaCheckSquare } from 'react-icons/fa';
import { getAllTask, deleteTask, deleteTasks } from '../../service/firebase';
import UserContext from '../../utils/context/user';
import Button from '../../component/public/button';
import notify from '../../component/public/notification';

const Tasks = (task) => {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();
  const [completedTask, setCompletedTask] = useState([]);
  const { user } = useContext(UserContext);

  const fetchTasks = async () => {
    const response = await getAllTask(user.uid);
    setTasks(response);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    notify({
      type: 'success',
      message: 'Task deleted'
    });
    fetchTasks();
  };

  const handleCheckbox = (id) => {
    const duplicate = completedTask.includes(id);
    if (duplicate) {
      completedTask.splice(completedTask.indexOf(id), 1);
    } else {
      setCompletedTask((prev) => [...prev, id]);
    }
  };

  const handleDeleteAll = async (e) => {
    e.preventDefault();
    try {
      await deleteTasks(completedTask);
      notify({
        type: 'success',
        message: 'Selected tasks deleted'
      });
      fetchTasks();
    } catch (err) {
      notify({
        type: 'error',
        message: err.message
      });
    }
  };

  const handleEdit = async (taskId, taskData) => {
    history.push({
      pathname: '/edit',
      state: { taskId, taskData }
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [task]);

  return (
    <div>
      <ToastContainer />
      <h1>Tasks</h1>
      <div className="flex-coloumn">
        {tasks.map((task) => (
          <div key={task.id} className="box flex-row">
            <button
              type="submit"
              className="btn-edit"
              onClick={() => handleEdit(task.id, task.taskData)}
            >
              <FaEdit />
            </button>
            <div>{task.taskData}</div>
            <div>
              <input
                type="checkbox"
                className="task-completed"
                onChange={() => handleCheckbox(task.id)}
              />
            </div>
            <button type="submit" className="btn-delete" onClick={() => handleDelete(task.id)}>
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
      <FaCheckSquare className="btn-deleteAll" />
      <Button value="Delete selected task" handleChange={handleDeleteAll} className="btnn" />
    </div>
  );
};

export default Tasks;
