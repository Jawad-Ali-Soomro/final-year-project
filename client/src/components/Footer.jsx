import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Footer.scss'
import { BiLogoDiscordAlt, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi'

const Footer = () => {
  return (
    <div className='footer-wrap flex'>
      <div className="left flex col">
      <div className="logo flex">
        <h1>Arthub</h1>
      </div>
        <p>artwork and news to your box</p>
        <div className="subscribe flex">
            <input type="text" />
            <button>SUBSCRIBE</button>
        </div>
      </div>
      <div className="right flex col">
        <h2>COMMUNITY</h2>
        <ul className="flex col">
            <li>Help Center</li>
            <li>Community Guidelines</li>
            <li>terms of service</li>
        </ul>
        <ul className="flex">
            <Link className='link'><BiLogoDiscordAlt /></Link>
            <Link className='link'><BiLogoInstagram /></Link>
            <Link className='link'><BiLogoFacebook /></Link>
            <Link className='link'><BiLogoTwitter /></Link>
        </ul>
      </div>
      <div className="right flex col">
        <h2>FEATURED</h2>
        <ul className="flex col" style={{gap: '10px'}}>
            <li>Featured Art</li>
            <li> Featured Series</li>
            <li>Top Artists</li>
            <li>Join As An Artist</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
