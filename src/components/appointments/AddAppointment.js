import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { DatePicker, DateTimePicker, MobileDatePicker } from '@mui/x-date-pickers'
import React, { useMemo, useState } from 'react'
import { createAppointment} from '../../actions/appointment'
import { useValue } from '../../context/ContextProvider'
import dayjs from 'dayjs'
const AddAppointment = ({open,handleClose}) => {
    const {state:{customers,customer,services,service,facilityThreshold,filteredAppointments,appointmentCalendar:{date}},dispatch} = useValue()
    // const [selectedCustomer, setSelectedCustomer] = useState(null);
    // console.log("customers",customers)
    const handleCustChange = (event, newValue) => {
        // setSelectedCustomer(newValue);
        dispatch({type:'UPDATE_CUSTOMER',payload:newValue})
    }
    const handleServiceChange = (event, newValue) => {
        // setSelectedCustomer(newValue);
        dispatch({type:'UPDATE_SERVICE',payload:newValue})
    }
    const handleSubmit = (e) => {
        // console.log("customer",customer)
        // console.log("service",service)
        e.preventDefault()
        const appointment= {
            date:date.$d,
            jobDescription:service.jobDescription,
            custName:customer.custName,
            apptEmail:customer.custEmail,
            plannedTime:service.plannedTime,
            partsCost:service.partsCost,
        }
        console.log("appointment",appointment)
        createAppointment(appointment,dispatch)
        dispatch({type:'UPDATE_CUSTOMER',payload:null})
        dispatch({type:'UPDATE_SERVICE',payload:null})
        handleClose()
        // console.log("service",service)
    }
    // console.log("appointments",appointments)
    return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Appointment</DialogTitle>
        <form onSubmit={handleSubmit}>
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
                
                {/* <MobileDatePicker/> */}
            </DialogContent>
            <DialogContent dividers>
            <DatePicker
                label="Appointment Date"
                value={date}
                onChange={(newDate) => {
                    dispatch({type:'UPDATE_APPOINTMENT_CALENDAR',payload:{date:newDate}})
                }}
                disablePast
                //disable date if filteredAppointments length is greater than 1
                shouldDisableDate={(date) => {
                    return filteredAppointments.filter(appointment => {
                        return dayjs(appointment.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
                    }).length > facilityThreshold
                }}
                //if date is full for date notify customer to choose different date
                slotProps={{
                    textField: {
                        helperText: filteredAppointments.filter(appointment => {
                            return dayjs(appointment.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
                        }
                        ).length > facilityThreshold ? "Date is full, please choose another date" : "Available!",
                    },
                }}      
            />
            </DialogContent>         
            <DialogActions>
                <Button variant="contained" color='secondary'sx={{mr:2}} onClick={handleClose}>Cancel</Button>
                {/* if customer/type of service selected and date is available, show submit button */}
                {customer && service && filteredAppointments.length <= 1 && (
                    <Button type='submit' variant='contained' >
                        Submit
                        </Button>
                        )}
            </DialogActions>
        </form>
    
        
    </Dialog>
  )
}

export default AddAppointment