
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register"
import UploadFile from "./components/UploadFile";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase"
import { onAuthStateChanged } from 'firebase/auth'

import Navbar from "./components/Navbar";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Route, Routes} from 'react-router-dom'


//last updated September 7, 2023

//TO-DO:

//FIX ROUTING
//Upload file component
  //CSS
  //inputs for name+description of file
  //incorporate drag and drop option
//make home page list uploaded files+info
  //name, date uploaded, size
//individual file
  //user should be able to view, edit, share and delete any particular file
//authentication+signup/login components
  //enable users to stay logged in after leaving the site
  //list user's name while logged in (currently shows email)
// more CSS

const App = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});

  

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  

  return (
    <div className="home">
      {user ? 
      <div>
        <nav>
          <Navbar user={user}/>
          <Login 
          setLoginEmail={setLoginEmail}
          loginEmail={loginEmail}
          setLoginPassword={setLoginPassword}
          loginPassword={loginPassword}
          setRegisterEmail={setRegisterEmail}
          registerEmail={registerEmail}
          setRegisterPassword={setRegisterPassword}
          registerPassword={registerPassword}
          setUser={setUser}
          user={user}
          />
        </nav>
        <Routes>
          <Route path='/' element={<div className="site-title"></div>} />
          <Route path='/register' element={<Register />} />
          <Route path='/upload' element={<UploadFile />} />
        </Routes>
        <div className="home-content">
          {/* Remove Upload from here once routing is fixed */}
          <UploadFile />
          <p>Files will go here</p>
        </div>
      </div>
      
      : 
      <div className="home">
        <h1 className="site-title">File Uploader</h1>
        
        <Login 
        setLoginEmail={setLoginEmail}
        setUser={setUser}
        user={user}
        loginEmail={loginEmail}
        setLoginPassword={setLoginPassword}
        loginPassword={loginPassword}
        />

        {/* <Register
        setRegisterEmail={setRegisterEmail}
        registerEmail={registerEmail}
        setRegisterPassword={setRegisterPassword}
        registerPassword={registerPassword}
        setUser={setUser}
        user={user}
        /> */}
        
      </div>}
      
    
      
      
      
    </div>
  );
};

export default App;
