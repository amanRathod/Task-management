import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../component/private/header';
import UserContext from '../../utils/context/user';
import { addTask } from '../../service/firebase';
import Tasks from './tasks';
import Button from '../../component/public/button';
import notify from '../../component/public/notification';

const Dashboard = () => {
  const [task, setTask] = useState('');
  const { user } = useContext(UserContext);
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await addTask(task, user.uid);
      setTask('');
      notify({
        type: 'success',
        message: 'Task added'
      });
    } catch (err) {
      notify({
        type: 'error',
        message: err.message
      });
    }
  };

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="flex-coloumn">
        <div className="form">
          <input
            value={task}
            placeholder="Input Task..."
            onChange={(e) => setTask(e.target.value)}
            className="input-task"
          />
          <Button value="Add Task" handleChange={handleAddTask} />
        </div>
        <Tasks task={task} />
      </div>
    </div>
  );
};

export default Dashboard;
