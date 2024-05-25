import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to='/'className='site-title'>File Uploader</Link>
        <ul>
            <li>
                <Link to="/upload">Upload File</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar