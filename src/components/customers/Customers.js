import { Box, Typography } from '@mui/material'
import React from 'react'

const Customers = () => {
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
        sx={{textAlign:'center',mt:15,mb:3}}
        >
            Customers
        </Typography>
    </Box>
  )
}

export default Customers