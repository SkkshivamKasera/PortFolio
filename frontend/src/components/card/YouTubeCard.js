import React from 'react'
import './YouTubeCard.css'
import { Button, Typography } from '@mui/material'
import { FaTrash } from 'react-icons/fa'
import { deleteYouTube, getUser } from '../../actions/user'
import { useDispatch } from 'react-redux'

const YouTubeCard = ({id, url="https://youtube.com/6packprogrammer", title="Title Here", image, isAdmin=false}) => {

  const dispatch = useDispatch()

  const deleteHandler = async (id) => {
    await dispatch(deleteYouTube(id))
    dispatch(getUser())
  }
  return (
    <div className='youtubeCard'>
      <a href={url} target='blank'>
        <img src={image} alt='Not Loaded'></img>
        <Typography>{title}</Typography>
      </a>
      {isAdmin && <Button className='deleteButton' onClick={() => deleteHandler(id)}><FaTrash/></Button>}
    </div>
  )
}

export default YouTubeCard
