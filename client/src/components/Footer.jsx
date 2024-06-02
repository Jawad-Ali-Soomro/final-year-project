import React from 'react'
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import '../styles/Footer.scss'

const Footer = () => {
  return (
    <div className='footer-wrap flex'>
      <div className="left">
        <h2>arthub.art &reg; 2024</h2>
      </div>
      <div className="newsletter flex">
        <input type="text" placeholder='Enter Email Address' />
        <button>Subscribe</button>
      </div>
      <div className="right flex">
        <Link className='link'>
            <BiLogoFacebook />
        </Link>
        <Link className='link'>
            <BiLogoInstagram />
        </Link>
        <Link className='link'>
            <BiLogoTwitter />
        </Link>
        <Link className='link'>
            <BiLogoYoutube />
        </Link>
      </div>
    </div>
  )
}

export default Footer
