import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, Link, useHistory } from 'react-router-dom';
import Header from '../../component/private/header';
import { updateTask } from '../../service/firebase';
import notify from '../../component/public/notification';

const Edit = () => {
  const location = useLocation();
  const history = useHistory();
  const [currentData, setCurrentData] = useState(location.state.taskData);
  const handleDone = async () => {
    await updateTask(location.state.taskId, currentData);
    notify({
      type: 'success',
      message: 'Task edited'
    });
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  useEffect(() => {
    document.title = 'Edit';
  }, []);

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="flex-coloumn">
        <div className="input">
          <textarea
            rows="5"
            cols="60"
            value={currentData}
            className="edit-task"
            onChange={(e) => setCurrentData(e.target.value)}
          />
        </div>
        <div className="flex-row">
          <Link to="/">
            <button type="button" className="cancel cancel-done">
              Cancel
            </button>
          </Link>
          <button type="button" className="cancel-done" onClick={handleDone}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
