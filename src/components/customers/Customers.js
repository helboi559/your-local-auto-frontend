import { PersonAdd } from '@mui/icons-material'
import { Box, Dialog, Fab, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddCustomer from './AddCustomer'

const Customers = () => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box
    sx={{
      height:400,
      width:'100%'
    }}
    >
        <Typography
        variant='h4'
        component='h4'
        sx={{textAlign:'center',mt:10,mb:3}}
        >
            Customers
        </Typography>
        <Fab color='secondary' variant='extended' sx={{ml:3,mb:3}} onClick={handleClick}>
            <PersonAdd sx={{mr:1}}/>
            Add Customer
           
        </Fab>
        <AddCustomer open={open} handleClose={handleClose}/>
    </Box>
  )
}

export default Customers