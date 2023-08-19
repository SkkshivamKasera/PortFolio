import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../loader/Loader'
import { addYouTube, getUser } from '../../actions/user'
import { MdKeyboardBackspace } from 'react-icons/md'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './YouTube.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import YouTubeCard from '../card/YouTubeCard'

const YouTube = () => {
    const dispatch = useDispatch()
    const { loading, error, message } = useSelector((state) => state.update)
    const { user } = useSelector(state=>state.user)
    const { message: loginMessage } = useSelector(state=>state.auth)
 
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [image, setImage] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(addYouTube(title, url, image))
        dispatch(getUser())
    }

    const handleYouTubeImage = (e) => {
        const Reader = new FileReader()
        Reader.readAsDataURL(e.target.files[0])
        Reader.onload = () => {
            if(Reader.readyState === 2){
                setImage(Reader.result)
            }
        }
    }

    useEffect(() => {
        if(error) {
            setTitle("")
            setUrl("")
            setImage("")
            toast.error(error)
            dispatch({ type: "CLEAR_ERROR" })
        }
        if(message){
            setTitle("")
            setUrl("")
            setImage("")
            toast(message)
            dispatch({ type: "CLEAR_MESSAGE" })
        }
        if(loginMessage){
            toast(loginMessage)
            dispatch({ type: "CLEAR_MESSAGE" })
        }
    }, [dispatch, error, message, loginMessage])
    return (
        loading ? <Loader /> : (
            <div className='adminYouTubePanel'>
                <div className="adminYouTubePanelContainer">
                    <Typography variant='h4'>
                        <p>Y</p>
                        <p>O</p>
                        <p>U</p>
                        <p>T</p>
                        <p>U</p>
                        <p>B</p>
                        <p>E</p>
                    </Typography>
                    <form onSubmit={submitHandler}>
                        <input
                            type='text'
                            placeholder='Title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='adminYouTubePanelInputs'
                        />
                        <input
                            type='text'
                            placeholder='Link'
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className='adminYouTubePanelInputs'
                        />
                        <input
                            type='file'
                            onChange={handleYouTubeImage}
                            className='adminYouTubePanelFileUpload'
                            placeholder='Choose Avatar'
                            accept='image/*'
                        />
                        <Button type='submit' disabled={!title || !url || !image || loading} variant='contained'>
                            Add
                        </Button>
                        <Link to="/Account">
                            BACK <MdKeyboardBackspace />
                        </Link>
                    </form>
                    <div className='adminYouTubePanelVideos'>
                        {user && user.youtube && user.youtube.map((item) => (
                            <YouTubeCard key={item._id} id={item._id} url={item.url} title={item.title} image={item.image.url} isAdmin={true} />
                        ))}
                    </div>
                </div>
                <ToastContainer/>
            </div>
        )
    )
}

export default YouTube
