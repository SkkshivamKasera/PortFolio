import React from 'react'
import './Footer.css'
import {Typography} from "@mui/material"
import { Link } from 'react-router-dom'
import {
    BsGithub,
    BsYoutube,
    BsInstagram,
    BsLinkedin
}from 'react-icons/bs'
const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <Typography variant='h5'>About Me</Typography>
        <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius debitis blanditiis nesciunt neque optio quae rerum aliquam exercitationem distinctio atque!
        </Typography>
        <Link top="/contact" className='footerContactBtn'>
            <Typography>Contact Us</Typography>
        </Link>
      </div>
      <div>
        <Typography variant='h6'>Social Media</Typography>
        <a href='https://github.com/' target='blank'>
            <BsGithub/>
        </a>
        <a href='https://youtube.com/' target='blank'>
            <BsYoutube/>
        </a>
        <a href='https://instagram.com/' target='blank'>
            <BsInstagram/>
        </a>
        <a href='https://linkedin.com/' target='blank'>
            <BsLinkedin/>
        </a>
      </div>
    </div>
  )
}

export default Footer
