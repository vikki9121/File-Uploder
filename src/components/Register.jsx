import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase'

const Register = ( {setRegisterEmail, registerEmail, setRegisterPassword, registerPassword }) => {
    const registerUser = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
        };
  
    return (
    <div>
        <div className="login">
          <h3>CREATE ACCOUNT</h3>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button onClick={registerUser}>Create User</button>
            </div>
    </div>
  )
}

export default Register