import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { DatePicker, DateTimePicker, MobileDatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import { useValue } from '../../context/ContextProvider'

const AddAppointment = ({open,handleClose}) => {
    const {state:{customers,customer},dispatch} = useValue()
    // const [selectedCustomer, setSelectedCustomer] = useState(null);
    // console.log("customers",customers)
    //when dialog is clicked render the calendar with available timeslots per selected day
    //take selected customer name and email and phone number and update the state of customer
    //when time slot is clicked, activate confirm button to the appointment.
    const handleObjectChange = (event, newValue) => {
        // setSelectedCustomer(newValue);
        dispatch({type:'UPDATE_CUSTOMER',payload:newValue})
    }
    return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Appointment</DialogTitle>
        <form >
            <DialogContent dividers>
                <DialogContentText>
                    Fill out the form below to create an Appointment
                </DialogContentText>
                <Autocomplete
                    disablePortal
                    // id="custName"
                    value={customer}
                    options={customers}
                    getOptionLabel={(option) => option.custName}
                    onChange={handleObjectChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Customer Name" />}
                    renderOption={(props,option) => (
                        <div {...props}>
                            {option.custName}
                        </div>
                    )}
                />
                {/* if customer is selected, show the customer details */}
                {customer && (
                    <DialogContentText>
                        Customer Name : {customer?.custName}<br/>
                        Customer Email : {customer?.custEmail}<br/>
                        Customer Phone : {customer?.custPhone}
                    </DialogContentText>
                )}
                {/* <DatePicker/> */}
                {/* <MobileDatePicker/> */}
                <DateTimePicker
                
                />
                
                <TextField
                    margin='normal'
                    autoFocus
                    fullWidth
                    label="Phone Number"
                    id='phoneNumber'
                    type={'tel'}
                    // inputRef={custPhoneRef}
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

export default AddAppointment