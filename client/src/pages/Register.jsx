import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

function Register() {
  const [inputs,setinputs] = useState({
    username:'',
    email:'',
    password:'',
  })

  const handleChange = (e)=>{
      setinputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
       const res = await axios.post('/api/auth/register',inputs);
       console.log(res);
    } catch (error) {
      console.log(error)
    }
   
  }
  return (
    <div className="auth">
      <h1>Register</h1>
      <form >
        <input type="text" placeholder='username' name='username' required onChange={handleChange}/>
        <input type="email" placeholder='email' name='email' required onChange={handleChange}/>
        <input type="password" placeholder='password' name='password' required onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        <p>There is a error!</p>
        <span>Have an account <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register