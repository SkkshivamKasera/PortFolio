import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../loader/Loader'
import { addTimeLine, deleteTimeLine, getUser } from '../../actions/user'
import { MdKeyboardBackspace } from 'react-icons/md'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './TimeLine.css'
import { FaTrash } from 'react-icons/fa'

const TimeLine = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.user)
    const { loading, error, message } = useSelector((state) => state.update)
    const { message: loginMessage } = useSelector(state=>state.auth)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(addTimeLine(title, description, date))
        dispatch(getUser())
    }

    const deleteHandler = async (id) => {
        await dispatch(deleteTimeLine(id))
        dispatch(getUser())
    }

    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch({type: "CLEAR_ERROR"})
        }
        if(message){
            toast(message)
            dispatch({type: "CLEAR_MESSAGE"})
        }
        if(loginMessage){
            toast(loginMessage)
            dispatch({ type: "CLEAR_MESSAGE" })
        }
    }, [dispatch, error, message, loginMessage])
  return (
    loading ? <Loader/> : (
        <div className='adminTimeLinePanel'>
            <div className="adminTimeLinePanelContainer">
                <Typography variant='h4'>
                    <p>T</p>
                    <p>I</p>
                    <p>M</p>
                    <p style={{ marginRight: "1vmax" }}>E</p>

                    <p>L</p>
                    <p>I</p>
                    <p>N</p>
                    <p>E</p>
                </Typography>
                <form onSubmit={submitHandler}>
                    <input 
                        type='text'
                        placeholder='Title'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='adminTimeLinePanelInputs'
                    />
                    <input 
                        type='text'
                        placeholder='Description'
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='adminTimeLinePanelInputs'
                    />
                    <input 
                        type='date'
                        placeholder='Date'
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='adminTimeLinePanelInputs'
                    />
                    <Button type='submit' disabled={!title||!description||!date||loading} variant='contained'>
                        Add
                    </Button>
                    <Link to="/Account">
                        BACK <MdKeyboardBackspace/>
                    </Link>
                </form>
                <div className='adminYouTubePanelVideos'>
                    {user && user.timeline && 
                    user.timeline.map((item) => (
                        <div className='youtubeCard' key={item._id}>
                            <Typography variant='h6'>{item.title}</Typography>
                            <Typography variant='body1' style={{letterSpacing: "2px"}}>
                                {item.description}
                            </Typography>
                            <Typography variant='body1' style={{fontWeight: 600}}>
                                {item.date.toString().split("T")[0]}
                            </Typography>
                            <Button className='deleteButton' onClick={() => deleteHandler(item._id)}>
                                <FaTrash/>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
  )
}

export default TimeLine
