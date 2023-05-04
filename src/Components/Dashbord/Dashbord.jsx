import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashbord.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  console.log(error);
  const [name, setName] = useState("");
  const [phoneNo, setPhone] = useState('');
  const [profile ,setProfile] = useState('')

  const navigate = useNavigate();
  
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);
      setName(data.name);
      setPhone(data.phoneNumber)
      setProfile(data.url)
      
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className="dashboard">
       <div className="dashboard__container">
          <h2>User Profle</h2>
          <div>
          <img style={{height:"150px" ,width:"150px"}} src={profile} alt="profile" />
          </div>
         <div>{name}</div>
         <div>{user?.email}</div>
         <div>{phoneNo}</div>
        

         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default Dashboard;