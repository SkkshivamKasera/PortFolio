import React from 'react'
import './About.css'
import { Typography } from '@mui/material'

const About = ({ about }) => {
    return (
        <div className='about'>
            <div className="aboutContainer">
                <Typography>{about.quote}</Typography>
            </div>
            <div className="aboutContainer2">
                <div>
                    <img src={about.avatar.url} alt='Not Loaded' className='aboutAvatar' />
                    <Typography variant='h4' style={{ margin: "1vmax 0", color: "black" }}>{about.name}</Typography>
                    <Typography>{about.title}</Typography>
                    <Typography style={{ margin: "1vmax 0" }}>{about.subtitle}</Typography>
                </div>
                <div style={{width: "600px", overflow: 'auto'}} className='scroll'>
                    <Typography style={{
                        overflowWrap: "break-word",
                        wordSpacing: "5px",
                        lineHeight: "50px",
                        letterSpacing: "5px",
                    }}>{about.description}</Typography>
                </div>
            </div>
        </div>
    )
}

export default About
