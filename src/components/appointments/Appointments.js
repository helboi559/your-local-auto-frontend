import { Add, CalendarMonth } from '@mui/icons-material'
import { Box, Container, Fab, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getCustomers } from '../../actions/customer'
import { fetchServices } from '../../actions/service'
import { useValue } from '../../context/ContextProvider'
import AddAppointment from './AddAppointment'

const Appointments = () => {
  const [open, setOpen] = useState(false)
  const {state:{services},dispatch} = useValue()
  const handleClick = () => {
    setOpen(true)
    fetchServices(dispatch)
    
  }
  const handleClose = () => {
    setOpen(false)
  }
  // useEffect(() => {
  //   if(services.length === 0) fetchServices(dispatch);
  // }, [])
  // console.log("services",services)
  return (
    <Box
    sx={{
      height:500,
      width:'100%',
      mt:10,mb:4,
    }}
    >
        <Container
        sx={{mr:1,display:'flex',justifyContent:'space-between', mb:1}}
        >
        
            <Typography
            variant='h5'
            component='h5'
            noWrap
            sx={{textAlign:'center',mt:0}}
            >
                Appointments
                <CalendarMonth
                sx={{ml:1}}
                />
            </Typography>
            
          {/* responsive desktop make appointment button */}
          <Fab size="small" color='secondary' variant='extended' onClick={handleClick} >
              <Add sx={{mr:1}}/>
              Make Appointment
          </Fab>
          {/* responsive mobile make appointment button */}
          {/* <Fab size="small" color='secondary' variant='extended' onClick={handleClick} sx={{display:{ xs: 'flex', sm: 'none', md: 'none' }}}>
              <Add sx={{mr:0.5}}/>
              Make Appointment
          </Fab> */}
          <AddAppointment open={open} handleClose={handleClose}/>
        </Container>
    </Box>
  )
}

export default Appointments