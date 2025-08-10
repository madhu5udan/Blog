import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

function Register() {
  const [inputs,setinputs] = useState({
    username:'',
    email:'',
    password:'',
  })

  const [err,seterr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e)=>{
      setinputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await axios.post('/api/auth/register',inputs);
       navigate('/login')
    } catch (error) {
      seterr(error.response.data);
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
        {err && <p>{err}</p>}
        <span>Have an account <Link to='/login'>Login</Link></span>
      </form>
    </div>
  ) 
}

export default Register