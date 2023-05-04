import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { storage } from "../firebase";
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [percent, setPercent] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  
  const navigate = useNavigate();

  function handleChange(event) {
        setFile(event.target.files[0]);
      }

  const handleUpload = ()=>{

    if (!file){
      console.log("plz upload the file");
    }
    const storageRef = ref(storage,  `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on(
              "state_changed",
              (snapshot) => {
              const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                   );
                  // update progress
                  setPercent(percent);
                },
              (err) => console.log(err),
              () => {
                  // download url
                  getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                
                  // Stroring data in  firebase database
                  registerWithEmailAndPassword(name, email, password, phoneNumber,url)

               });  
            }
        );
  }

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <input type="file" accept="image/*" onChange={handleChange}/>

        <input
          type="text"
          className="register__textBox"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone No"
        />

        <button className="register__btn" onClick={handleUpload}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
        <div>
          Go to? <Link to="/">HomePage</Link>.
        </div>
      </div>
    </div>
  );
}
export default Register;
