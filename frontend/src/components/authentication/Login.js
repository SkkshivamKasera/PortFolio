import React, { useEffect, useState } from 'react'
import './Login.css'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/user'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../loader/Loader'
const Login = () => {

    const dispatch = useDispatch()
    const {loading,message, error} = useSelector((state) => state.auth)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch({type: "CLEAR_ERROR"})
      }
      if(message){
        toast(message)
        dispatch({type: "CLEAR_MESSAGE"})
      }
    }, [dispatch, error, message])
  return (
    loading ? <Loader/> :
      <div className='login'>
      <div className='loginContainer'>
        <form className='loginForm' onSubmit={submitHandler}>
            <Typography variant='h4'>
                <p>A</p>
                <p>D</p>
                <p>M</p>
                <p>I</p>
                <p style={{marginRight: "1vmax"}}>N</p>

                <p>P</p>
                <p>A</p>
                <p>N</p>
                <p>E</p>
                <p>L</p>
            </Typography>
            <div>
                <input 
                    type='email'
                    required
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    required
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit' variant='contained' disabled={loading}>
                    Login
                </Button>
            </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
    )
}

export default Login
