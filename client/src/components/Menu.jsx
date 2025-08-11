import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Menu({ cat }) {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts?cat=${cat}`);
        setposts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Some other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../public/uploads/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <Link className='link' to={`/post/${post.id}`} ><button>Read More</button></Link>
          
        </div>
      ))}
    </div>
  );
}

export default Menu;
