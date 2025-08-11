import React,{useState,useEffect, useContext} from 'react'
import user from '../img/user.jpeg'
import edit from '../img/edit.png'
import del from '../img/delete.jpeg'
import {Link,useLocation, useNavigate} from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'

function SinglePost() {
  const [post,setpost] = useState({});


  const location = useLocation()
  const postId = location.pathname.split('/')[2];

  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }

  useEffect(()=>{
    const fetchData = async()=>{
      try {
      const res = await axios.get(`/api/posts/${postId}`)
      setpost(res.data);
    } catch (error) {
      console.log(error);
    }
  }
    fetchData();
  },[postId])


  const handleDelete= async()=>{
    try {
      await axios.delete(`/api/posts/${postId}`)
      navigate('/')
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="single">
      <div className="content">
        <img src={`../public/uploads/${post?.img}`} alt="" />
        <div className="user">
          <img src={user} alt="USERIMAGE" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          { currentUser.username === post.username &&
            <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
            <img src={edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={del} alt="" />
          </div>
          }
        </div>
        <h1>{post.title}</h1>
          {getText(post.desc)}
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default SinglePost