import { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../utils/context/firebase';

export default function UserAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authuser')));
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    // get the current user is by setting an observer on the Auth object:
    const listener = firebase.auth().onAuthStateChanged((authuser) => {
      if (authuser) {
        localStorage.setItem('authuser', JSON.stringify(authuser));
        setUser(authuser);
      } else {
        localStorage.removeItem('authuser');
        setUser(null);
      }
    });
    // clear the interval to avoid memory leaks
    return () => listener();
  }, [firebase]);

  return user;
}
