import React from 'react'
import logo from '../img/logo.png'
import edit from '../img/edit.png'
import del from '../img/delete.jpeg'
import {Link} from 'react-router-dom'
import Menu from '../components/Menu'

function SinglePost() {
  return (
    <div className="single">
      <div className="content">
        <img src={logo} alt="" />
        <div className="user">
          <img src={logo} alt="USERIMAGE" />
          <div className="info">
            <span>Madhu</span>
            <p>posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
            <img src={edit} alt="" />
            </Link>
            <img src={del} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, eum!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, tempore eligendi praesentium exercitationem aspernatur voluptatem temporibus, nostrum quae odit quam, repudiandae ut qui perspiciatis nemo minima non nulla doloremque omnis laboriosam corrupti. Reprehenderit quia, non asperiores nihil, consectetur assumenda aliquid sunt delectus sit, laudantium consequatur. Eligendi, odio? Voluptatem quis nobis voluptate. Doloremque itaque harum ipsa ipsum, placeat aliquid veritatis ratione quam corrupti blanditiis repudiandae molestias dolores beatae numquam sapiente pariatur natus, nisi similique quibusdam dignissimos. Inventore pariatur nobis accusantium perferendis quidem, dolor esse? Inventore deserunt voluptatum molestias minus quasi, culpa debitis at! Tempora fugit, neque quibusdam similique eum ipsum tenetur!<br></br><br></br>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima dolorem voluptatem aperiam consectetur voluptates, obcaecati, fugit pariatur nulla provident consequatur quam? Qui, dicta reprehenderit? Eum aut fuga quisquam excepturi quis delectus corrupti dolore tenetur. Fuga voluptate velit voluptates, qui temporibus expedita impedit saepe delectus facere amet rem aperiam tenetur mollitia.
        </p>
      </div>
      <Menu />
    </div>
  )
}

export default SinglePost