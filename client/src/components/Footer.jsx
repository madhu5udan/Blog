import React from 'react'
import logo from '../img/logo.png'
function Footer() {
  return (
    <footer>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <span>Made with ❤ and <b>React.js</b>.</span>
    </footer>
  )
}

export default Footer