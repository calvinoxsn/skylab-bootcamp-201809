import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'


const Footer  = () => {
  return (
    <div className='footer-container'>
      <Link to={`/chat-list`} ><span><i className="fas fa-comment-alt"></i></span></Link>
    </div>
  )
}

export default Footer