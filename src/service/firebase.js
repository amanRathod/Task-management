import { firebase } from '../firebase/firebase';

export async function addTask(taskData, userId) {
  const data = await firebase.firestore().collection('task').add({
    taskData,
    userId
  });
  return data;
}

export async function getAllTask(userId) {
  const data = await firebase
    .firestore()
    .collection('task')
    .where('userId', '==', userId)
    .get()
    .then((snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        taskData: doc.data().taskData,
        userId: doc.data().userId
      }));
      return tasks;
    });

  return data;
}

export async function updateTask(docId, taskData) {
  const data = await firebase.firestore().collection('task').doc(docId).update({ taskData });
  return data;
}

export async function deleteTask(docId) {
  const data = await firebase.firestore().collection('task').doc(docId).delete();
  return data;
}

export async function deleteTasks(docIds) {
  docIds.map(async (id) => {
    await firebase.firestore().collection('task').doc(id).delete();
  });
}
