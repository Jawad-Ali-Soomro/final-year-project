import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Footer.scss'
import { BiLogoDiscordAlt, BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from 'react-icons/bi'

const Footer = () => {
  return (
    <div className='footer-wrap flex'>
      <div className="left flex col">
      <div className="logo flex">
        <img src="../public/logo.svg" alt="" />
        <h1>ARTHUB</h1>
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
        <ul className="flex col" style={{gap: '5px'}}>
            <li>FEATURED ART</li>
            <li> FEATURED SERIES</li>
            <li>Top Artists</li>
            <li>JOIn as an artist</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
