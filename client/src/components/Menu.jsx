import React from 'react'

function Menu() {

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
    <div className='menu'>
        <h1>Some other post you like</h1>
        {posts.map((post)=>(
            <div className="post" key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu