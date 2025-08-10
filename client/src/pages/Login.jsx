import React,{useContext, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';


function Login() {

  const [inputs,setinputs] = useState({
    username:'',
    password:'',
  })

  const [err,seterr] = useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const handleChange = (e)=>{
      setinputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        await login(inputs)
       navigate('/')
    } catch (error) {
      seterr(error.response.data);
    }
   
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form  >
        <input onChange={handleChange} type="text" name='username' placeholder='username' />
        <input onChange={handleChange} type="password" name='password' placeholder='password' />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't have an account <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}

export default Login