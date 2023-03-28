import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { DatePicker, DateTimePicker, MobileDatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import { useValue } from '../../context/ContextProvider'

const AddAppointment = ({open,handleClose}) => {
    const {state:{customers,customer,services,service},dispatch} = useValue()
    // const [selectedCustomer, setSelectedCustomer] = useState(null);
    // console.log("customers",customers)
    //when dialog is clicked render the calendar with available timeslots per selected day
    //take selected customer name and email and phone number and update the state of customer
    //when time slot is clicked, activate confirm button to the appointment.
    const handleCustChange = (event, newValue) => {
        // setSelectedCustomer(newValue);
        dispatch({type:'UPDATE_CUSTOMER',payload:newValue})
    }
    const handleServiceChange = (event, newValue) => {
        // setSelectedCustomer(newValue);
        dispatch({type:'UPDATE_SERVICE',payload:newValue})
    }
    console.log("services",services)
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
                    onChange={handleCustChange}
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
            </DialogContent>
            <DialogContent dividers>
                <Autocomplete
                    disablePortal
                    value={service}
                    options={services}
                    getOptionLabel={(option) => option.jobDescription}
                    onChange={handleServiceChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Service/Complaint" />}
                    renderOption={(props,option) => (
                        <div {...props}>
                            {option.jobDescription}
                        </div>
                    )}
                />
                <DatePicker/>
                {/* <MobileDatePicker/> */}
                
                
               
            </DialogContent>
                
                <DialogActions>
                    <Button type='submit' variant='contained' color='secondary' >
                        Submit
                    </Button>
                </DialogActions>
            
        </form>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        
    </Dialog>
  )
}

export default AddAppointment