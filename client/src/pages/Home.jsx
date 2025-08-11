import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios';
function Home() {
  const [posts,setposts] = useState([]);


  const cat = useLocation().search
  console.log(cat);
  useEffect(()=>{
    const fetchData = async()=>{
      try {
      const res = await axios.get(`/api/posts${cat}`)
      setposts(res.data);
    } catch (error) {
      console.log(error);
    }
  }
    fetchData();
  },[cat])
  // const posts = [
  //   {
  //     id:1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, deserunt. Cupiditate, quam! Natus rerum iste reprehenderit officiis minima sed ipsam!",
  //     img:"https://static.vecteezy.com/system/resources/thumbnails/049/855/296/small_2x/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg "
  //   },
  //   {
  //     id:2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, deserunt. Cupiditate, quam! Natus rerum iste reprehenderit officiis minima sed ipsam!",
  //     img:" https://static.vecteezy.com/system/resources/thumbnails/049/855/296/small_2x/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg"
  //   }
  // ]

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }
  return (
    <div className="home">
         <div className="posts">
      {posts.map(post=>(
        <div className="post" key={post.id}>
          <div className="img">
            <img src={`../public/uploads/${post.img}`} alt="" />
          </div>
          <div className="content">
            
              <h1>{post.title}</h1>
           
            <p>{getText(post.desc)}</p>
            <Link className='link' to={`/post/${post.id}`}>
            <button>Read More</button>
             </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
   
  )
}

export default Home