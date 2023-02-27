import { Close, Send } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { login, register } from '../../actions/user'
import { useValue } from '../../context/ContextProvider'
import GoogleOneTapLogin from './GoogleOneTapLogin'
import PasswordFields from './PasswordFields'

//if user is registered show login page
//else show login details
const UserLogin = () => {
    const {state:{openLogin},dispatch} = useValue()
    const [isRegistered,setIsRegistered] = useState(false)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [title,setTitle] = useState('Login')
    const handleClose = ()=> {
        dispatch({type:'CLOSE_LOGIN'})
    }
    // console.log(openLogin)
    const handleSubmit = (e)=> {
        e.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        //if not on register modal send login req
        if(!isRegistered) {
           return login({email,password},dispatch)
        }
        const name = nameRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword) {

            return dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                open: true,
                severity: 'error',
                message: 'Passwords do not match',
                },
            });
        }
        //send post req
        register({ name, email, password }, dispatch);
    }
    useEffect(()=> {
        isRegistered ? setTitle('Register') : setTitle('Login')
    },[isRegistered])
    return (
    <Dialog
    open={openLogin}
    onClose={handleClose}
    >
        <DialogTitle>
            {title}
            <IconButton
            sx={{
              position:"absolute",
              top:8,
              right:8,
              color:(theme)=> theme.palette.grey[500]
            }}
            onClick={handleClose}
            >
                <Close/>
            </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
            <DialogContent dividers>
                {isRegistered && (
                    <TextField
                    autoFocus
                    label="Name"
                    id='name'
                    type="text"
                    fullWidth
                    inputRef={nameRef}
                    inputProps={{minLength:3}}
                    required
                    />
                )}
                <TextField
                    margin='normal'
                    inputRef={emailRef}
                    label="Email"
                    autoFocus
                    fullWidth
                    id='email'
                    type='email'
                    required
                />
                <PasswordFields {...{passwordRef}}/>
                {isRegistered && (
                    <PasswordFields passwordRef={confirmPasswordRef} label="Confirm Password" id="confirmPassword"/>
                )}
                <DialogActions sx={{px:'20px'}}>
                    <Button type='submit' variant='contained' color='secondary' endIcon={<Send/>}>
                        Submit
                    </Button>
                    
                </DialogActions>

            </DialogContent>
        </form>
         <DialogActions>
            {isRegistered ? 'Ready to shop? Sign in!':"Dont you have an account with us? Create one"}
            <Button onClick={()=> setIsRegistered(!isRegistered)}>
                {isRegistered ? 'Login' : 'Register'}
            </Button>   
        </DialogActions>
        <DialogActions sx={{ justifyContent: 'center', py: '24px'}}>
            <GoogleOneTapLogin/>
        </DialogActions>

    </Dialog>
  )
}

export default UserLogin