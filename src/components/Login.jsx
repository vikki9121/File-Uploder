import React from "react";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Register from "./Register";
import { auth } from "../firebase";

const Login = ( {setLoginEmail, loginEmail, setLoginPassword, loginPassword, setRegisterEmail, registerEmail, setRegisterPassword, registerPassword, setUser, user} ) => {

  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user.user.email);
      setUser(user)
    } catch (error) {
      console.log(error.message);
      alert("Invalid Login, Please try again.")
    }
  };

  const logoutUser = async () => {
    await signOut(auth);
  };

  return (
    <div >
      {user ? (
        <div className="logout">
          {/* <h3>LOGOUT</h3> */}
          <h4>Hello, {user.email} </h4>
          <button className='logout-button' onClick={logoutUser}>Log Out</button>
        </div>
      ) : (
        <div className="login-window">
            <div className="login">
            {/* <h3>LOGIN</h3> */}
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={loginUser}>Login</button>
          <p>Don't have a login?<span>
            <a href="/register">Register</a>
            </span>
          </p>

            </div>
        </div>
      )}
    </div>
  );
};

export default Login;
