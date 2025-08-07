import React from 'react'
import {Link} from 'react-router-dom'
function Home() {
  const posts = [
    {
      id:1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, deserunt. Cupiditate, quam! Natus rerum iste reprehenderit officiis minima sed ipsam!",
      img:"https://static.vecteezy.com/system/resources/thumbnails/049/855/296/small_2x/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg "
    },
    {
      id:2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, deserunt. Cupiditate, quam! Natus rerum iste reprehenderit officiis minima sed ipsam!",
      img:" https://static.vecteezy.com/system/resources/thumbnails/049/855/296/small_2x/nature-background-high-resolution-wallpaper-for-a-serene-and-stunning-view-photo.jpg"
    }
  ]
  return (
    <div className="home">
         <div className="posts">
      {posts.map(post=>(
        <div className="post" key={post.id}>
          <div className="img">
            <img src={post.img} alt="" />
          </div>
          <div className="content">
            <Link className='link' to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <p>{post.desc}</p>
            <button>Read More</button>
          </div>
        </div>
      ))}
    </div>
    </div>
   
  )
}

export default Home