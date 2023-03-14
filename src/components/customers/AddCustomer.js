import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { createCustomer } from '../../actions/customer'
import { useValue } from '../../context/ContextProvider'
const AddCustomer = ({open,handleClose}) => {
    const {dispatch} = useValue()
    const custNameRef = useRef()
    const custPhoneRef = useRef()
    const custEmailRef = useRef()
    // const createCustomer = () => {
    // console.log(custNameRef.current.value)
    const handleCustomerSubmit = (e) => {
        e.preventDefault()
        const custName = custNameRef.current.value
        const custEmail = custEmailRef.current.value
        const custPhone = custPhoneRef.current.value
        
        //send post req
        createCustomer({custName,custEmail,custPhone},dispatch)
    }
    return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <form onSubmit={handleCustomerSubmit}>
            <DialogContent dividers>
                <DialogContentText>
                    Fill out the form below to create a new customer
                </DialogContentText>
                <TextField
                    margin='normal'
                    autoFocus
                    fullWidth
                    label="Customer Name"
                    id='name'
                    type={'text'}
                    inputRef={custNameRef}
                    required
                />
                <TextField
                    margin='normal'
                    autoFocus
                    fullWidth
                    label="Email"
                    id='email'
                    type={'email'}
                    inputRef={custEmailRef}
                    required
                />
                <TextField
                    margin='normal'
                    autoFocus
                    fullWidth
                    label="Phone Number"
                    id='phoneNumber'
                    type={'tel'}
                    inputRef={custPhoneRef}
                />
                <DialogActions>
                    <Button type='submit' variant='contained' color='secondary' >
                        Submit
                    </Button>
                </DialogActions>
            </DialogContent>
        </form>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddCustomer