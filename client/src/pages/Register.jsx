import React from 'react'
import {Link} from 'react-router'

function Register() {
  return (
    <div className="auth">
      <h1>Register</h1>
      <form >
        <input type="text" placeholder='username' required/>
        <input type="email" placeholder='email' required/>
        <input type="password" placeholder='password' required/>
        <button>Login</button>
        <p>There is a error!</p>
        <span>Have an account <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register