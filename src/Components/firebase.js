import { initializeApp } from "firebase/app";

import {GoogleAuthProvider,
        getAuth,signInWithPopup,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
        signOut,
      } from "firebase/auth";

import {getFirestore,
        query,
        getDocs,
        collection,
        where,
        addDoc,
      } from "firebase/firestore"

import { getStorage} from "firebase/storage";

    
// ************ Firebase Configuration ********************************************************************
const firebaseConfig = {
    apiKey:"AIzaSyB6Ad7zXzqxPoYrwNX-hlApQ54LqTICGwo" ,
    authDomain: "authentication-fd555.firebaseapp.com",
    projectId: "authentication-fd555",
    storageBucket: "authentication-fd555.appspot.com",
    messagingSenderId: "22143771364",
    appId: "1:22143771364:web:f493ea90bf7f1ffa5ec2f1",
    measurementId: "G-1QSQ9VDNJ4"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)


//**************** Register with name,email and password *****************************

const registerWithEmailAndPassword = async (name, email, password,phoneNumber,url) => {
  console.log("inregister firebase", url);
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      phoneNumber,
      url,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



// *************** SignIn With eamil and password *************************
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


// *************** Autentication with google *********************************
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    console.log(user);
    console.log(user.displayName);
    console.log(user.phoneNumber);
    console.log(user.photoURL);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        phoneNumber:null,
        url: user.photoURL
        
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



// **************  Password reset link ************************
const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


// *************** Logout functionality  ********************
  const logout = () => {
    signOut(auth);
  };



//   ********** Exporting all the functions of authentication *********************888
  export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    storage
  };
