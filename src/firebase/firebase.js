import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  
};

const firebase = Firebase.initializeApp(config);
const auth = firebase.auth();
const { FieldValue } = Firebase.firestore;

// export function signInWithGoogle() {
//   const provider = new Firebase.auth.GoogleAuthProvider();
//   auth.signInWithPopup(provider);
// }

export { firebase, FieldValue };
