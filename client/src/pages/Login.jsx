import React from 'react'
import { Link } from 'react-router'

function Login() {
  return (
    <div className="auth">
      <h1>Login</h1>
      <form >
        <input type="text" placeholder='username' />
        <input type="password" placeholder='password' />
        <button>Login</button>
        <p>There is a error!</p>
        <span>Don't have an account <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login