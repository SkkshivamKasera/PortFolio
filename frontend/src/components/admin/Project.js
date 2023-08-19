import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../loader/Loader'
import { addProject, getUser } from '../../actions/user'
import { MdKeyboardBackspace } from 'react-icons/md'
import { Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './TimeLine.css'
import { ProjectCard } from '../projects/Projects'

const Project = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state=>state.user)
    const { loading, error, message } = useSelector((state) => state.update)
    const { message: loginMessage } = useSelector(state=>state.auth)

    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [techStack, setTechStace] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(addProject(title, url, image, description, techStack))
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
        if (error) {
            toast.error(error)
            dispatch({ type: "CLEAR_ERROR" })
        }
        if (message) {
            setUrl("")
            setTitle("")
            setDescription("")
            setImage("")
            setTechStace("")
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
            <div className='adminTimeLinePanel'>
                <div className="adminTimeLinePanelContainer">
                    <Typography variant='h4'>
                        <p>P</p>
                        <p>R</p>
                        <p>O</p>
                        <p>J</p>
                        <p>E</p>
                        <p>C</p>
                        <p>T</p>
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
                            placeholder='Link'
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
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
                            type='text'
                            placeholder='Technology Stack'
                            required
                            value={techStack}
                            onChange={(e) => setTechStace(e.target.value)}
                            className='adminTimeLinePanelInputs'
                        />
                        <input
                            type='file'
                            onChange={handleYouTubeImage}
                            className='adminPanelFileUpload'
                            placeholder='Choose Avatar'
                            accept='image/*'
                        />
                        <Button type='submit' disabled={!title || !url || !image || loading} variant='contained'>
                            Add
                        </Button>
                        <Link to="/Account">
                            BACK <MdKeyboardBackspace />
                        </Link>
                    </form>\
                    <div className='adminYouTubePanelVideos'>
                        {user && user.projects && user.projects.map((item) => (
                            <ProjectCard key={item._id} id={item._id} url={item.url} projectImage={item.image.url} projectTitle={item.title} description={item.description} technologies={item.techStack} isAdmin={true} />
                        ))}
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    )
}

export default Project
