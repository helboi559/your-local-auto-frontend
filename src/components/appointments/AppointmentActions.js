import React from 'react'
import { Delete} from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';


const AppointmentActions = () => {
  return (
    <Box>
      <Tooltip title="Delete Appointment">
        <IconButton
        //   onClick={() => deleteAppointment(params.row,dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default AppointmentActions