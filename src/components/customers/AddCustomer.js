import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React, { useRef } from 'react'

const AddCustomer = ({open,handleClose}) => {
    const custNameRef = useRef()
    const custPhoneRef = useRef()
    const custEmailRef = useRef()
    // const createCustomer = () => {
    return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <form>
            <DialogContent dividers>
                <DialogContentText>
                    Fill out the form below to create a new customer
                </DialogContentText>
                <TextField
                    autoFocus
                    label="Customer Name"
                    id='name'
                    type={'text'}
                    in
                    />
            </DialogContent>
        </form>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default AddCustomer