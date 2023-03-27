import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Calendar = ({children}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
    </LocalizationProvider>
  )
}

export default Calendar