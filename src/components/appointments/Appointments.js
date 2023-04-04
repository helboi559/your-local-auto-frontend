import { Add, CalendarMonth } from '@mui/icons-material'
import { Box, Container, Fab, List, ListItem, ListItemText, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useEffect, useMemo, useState } from 'react'
import { getAppointments } from '../../actions/appointment'
import { getCustomers } from '../../actions/customer'
import { fetchServices } from '../../actions/service'
import { useValue } from '../../context/ContextProvider'
import AddAppointment from './AddAppointment'
import dayjs from 'dayjs'
import AppointmentActions from './AppointmentActions'
import { DataGrid } from '@mui/x-data-grid'
const Appointments = () => {
  const [open, setOpen] = useState(false)
  const {state:{services,appointments,filteredAppointments,appointmentCalendar:{date}},dispatch} = useValue()
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  
  const handleClick = () => {
    setOpen(true)
    fetchServices(dispatch)
    
  }
  const handleClose = () => {
    setOpen(false)
  }
  const columns = useMemo(
    () => [
      {field: 'apptDate',
        headerName: 'Date',
        width: 100,
        renderCell: (params) => (
          <span>
            {dayjs(params.row.date).format('MM/DD/YY')}
          </span>
        ),
      },
      {
        field: 'custName',
        headerName: 'Customer Name',
        width: 150,
      },
      { field: 'apptEmail', headerName: 'Customer Email', width: 130 ,},
      { field: 'jobDescription', headerName: 'Complaint/Service', width: 130},
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <AppointmentActions {...{ params , rowId , setRowId}} />
        ),
      },
     
      { field: '_id', headerName: 'Id', width: 75},
      
    ],
    [rowId]
  );
  useEffect(() => {
    // if date matches then filter appointments
    dispatch({type:'UPDATE_FILTERED_APPOINTMENTS',payload:appointments});

    if(appointments.length === 0) getAppointments(dispatch);
    //if date
  }, [appointments,date])
  // console.log("date",date)
  console.log("appointments2",appointments)
  // console.log("filteredAppointments2",filteredAppointments)
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
            variant='h6'
            component='h6'
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
              Appointment
          </Fab>
          {/* responsive mobile make appointment button */}
          {/* <Fab size="small" color='secondary' variant='extended' onClick={handleClick} sx={{display:{ xs: 'flex', sm: 'none', md: 'none' }}}>
              <Add sx={{mr:0.5}}/>
              Make Appointment
          </Fab> */}
          <AddAppointment open={open} handleClose={handleClose}/>
        </Container>
        <DatePicker
        sx={{width:'100%',mt:2,mb:2}}
        label="Appointment Date"
        value={date}
        onChange={(newDate) => {
            dispatch({type:'UPDATE_APPOINTMENT_CALENDAR',payload:{date:newDate}})
        }}
        />
        <DataGrid
        columns={columns}
        rows={filteredAppointments}
        getRowId={row=>row._id}
        rowsPerPageOptions={[5, 10, 20]}
        initialState={{
          columns: {
            columnVisibilityModel: {
              _id : false,
            }
          },
          pagination: {
            pageSize: 5,
          },
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
        />
    </Box>
  )
}

export default Appointments