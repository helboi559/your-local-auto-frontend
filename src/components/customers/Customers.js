import { Add,Group } from '@mui/icons-material'
import { Box, Button, Container, Dialog, Fab, Typography } from '@mui/material'
import { DataGrid , GridToolbarContainer, GridToolbarExport,gridClasses, GridToolbar} from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react'
import { getCustomers } from '../../actions/customer'
import { useValue } from '../../context/ContextProvider'
import AddCustomer from './AddCustomer'
import CustomerActions from './CustomerActions';

//export feature
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Customers = () => {
  const {state:{currentUser,customers},dispatch} = useValue()
  const [open, setOpen] = useState(false)
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const columns = useMemo(
    () => [
      {
        field: 'custName',
        headerName: 'Customer Name',
        editable: 'true',
        width: 150,
      },
      { field: 'custEmail', headerName: 'Customer Email', width: 150 ,},
      { field: 'custPhone', headerName: 'Customer Phone', width: 65 },
      { field: 'active',
        headerName: 'Active',
        type: 'boolean',
        editable: true,
        width: 65
      },
      {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        renderCell: (params) => (
          <CustomerActions {...{ params , rowId , setRowId}} />
        ),
      },
     
      { field: '_id', headerName: 'Id', width: 75},
      
    ],
    [rowId]
  );
  //get all customers
  useEffect(() => {
    if(customers.length === 0) {
      getCustomers(dispatch)
    }
  },[])
  // console.log(rowId)
  return (
    <Box
    sx={{
      height:500,
      width:'100%',
      mt:10,mb:4
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
                Customers
                <Group
                sx={{ml:1}}
                />
            </Typography>
            
          
          <Fab size="small" color='secondary' variant='extended' onClick={handleClick}>
              <Add sx={{mr:1}}/>
              Add Customer
          </Fab>
          <AddCustomer open={open} handleClose={handleClose}/>
        </Container>
        <DataGrid
        rows={customers}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{
          Toolbar: CustomToolbar,
        }}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        // sx={{
        //   [`& .${gridClasses.row}`]: {
        //     bgcolor: (theme) =>
        //       theme.palette.mode === 'dark' ? 'rgb(38, 50, 56)' : '#fff',
        //   },
        // }}
        onCellEditStop={(params) => setRowId(params.id)}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        />

    </Box>
  )
}

export default Customers