import { Add,Group } from '@mui/icons-material'
import { Box, Button, Container, Dialog, Fab, Typography } from '@mui/material'
import { DataGrid , GridToolbarContainer, GridToolbarExport,gridClasses, GridToolbar} from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react'
import { getCustomers } from '../../actions/customer'
import { useValue } from '../../context/ContextProvider'
import AddCustomer from './AddCustomer'
import CustomerActions from './CustomerActions';
import clsx from 'clsx';

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
      { field: 'custEmail', headerName: 'Customer Email', width: 130 ,},
      { field: 'custPhone', headerName: 'Customer Phone', width: 65 },
      { field: 'active',
        headerName: 'Active',
        type: 'boolean',
        editable: true,
        width: 65,
        cellClassName: (params) => {
          if (params.value == null) {
            return '';
          }

          return clsx('super-app', {
            false: params.value === false,
            true: params.value === true,
          });
      }
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
      mt:10,mb:4,
      '& .super-app.false': {
          backgroundColor: '#d47483',
          color: '#1a3e72',
          fontWeight: '600',
        },
      '& .super-app.true': {
        backgroundColor: 'rgba(157, 255, 118, 0.49)',
        color: '#1a3e72',
        fontWeight: '600',
      },
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
            
          {/* responsive desktop add customer button */}
          <Fab size="medium" color='secondary' variant='extended' onClick={handleClick} sx={{display:{ xs: 'none', sm: 'flex', md: 'flex' }}}>
              <Add sx={{mr:1}}/>
              Add Customer
          </Fab>
          {/* responsive mobile add customer button */}
          <Fab size="small" color='secondary' variant='extended' onClick={handleClick} sx={{display:{ xs: 'flex', sm: 'none', md: 'none' }}}>
              <Add sx={{mr:0.5}}/>
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
        onCellEditStart={(params) => setRowId(params.id)}
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