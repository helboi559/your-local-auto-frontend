import { Box, Typography } from '@mui/material'
import React from 'react'

const Appointments = () => {
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
            Appointments
        </Typography>
    </Box>
  )
}

export default Appointments