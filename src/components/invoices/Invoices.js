import { Box, Typography } from '@mui/material'
import React from 'react'

const Invoices = () => {
  //get appointments list
  //add features : export to csx, change status to completed, calculate total labor rate X planned hours + parts cost
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
            Invoices
        </Typography>
    </Box>
  )
}

export default Invoices