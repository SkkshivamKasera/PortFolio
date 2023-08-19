import React, { useEffect, useState } from 'react'
import './Contact.css'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { contact } from '../../actions/user'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../loader/Loader'

const Contact = () => {

    const dispatch = useDispatch()
    const { loading, error, message: contactMessage } = useSelector(state => state.update)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const contactFormHandler = (e) => {
        e.preventDefault()
        dispatch(contact(name, email, message))
    }

    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch({type: "CLEAR_ERROR"})
        }
        if(contactMessage){
            toast(contactMessage)
            dispatch({type: "CLEAR_MESSAGE"})
        }
    }, [dispatch, error, contactMessage])
    return (
        loading ? <Loader/> : <div className='contact'>
            <div className="contactRightBar"></div>
            <div className="contactContainer">
                <form className="contactContainerForm" onSubmit={contactFormHandler}>
                    <Typography variant='h4'>Contact Us</Typography>
                    <input type="text" required placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <textarea required placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} cols="30" rows="10"></textarea>
                    <Button disabled={!name||!email||!message||loading} variant='contained' type='submit'>Send</Button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Contact
