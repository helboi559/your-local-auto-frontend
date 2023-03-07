import { Build, CalendarMonth, ChevronLeftOutlined, Inventory, People, Receipt } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import React from 'react'
import { useValue } from '../context/ContextProvider';

const DrawerHeader = styled('div')(({ theme }) => ({
  width:130,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SideBar = ({isOpen,setIsOpen}) => {
    const {state:{section},dispatch} = useValue()
    return (
    <Box
    sx={{display: 'flex'}}
    onClick={()=> setIsOpen(false)}
    >
        <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            // width: drawerWidth,
          },
        }}
        variant="temporary"
        anchor="left"
        open={isOpen}
        // onClose={setIsOpen(false)}
      >
        <DrawerHeader>
          <IconButton onClick={()=>setIsOpen(false)}>
            <ChevronLeftOutlined/>
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <Divider />
        <List>
            <ListItem  >
              <ListItemButton onClick={()=> {
                dispatch({ type: 'UPDATE_SECTION', payload: 0 });
              }}>
                <ListItemIcon>
                  <Inventory/>
                </ListItemIcon>
                <ListItemText primary="Inventory" />
              </ListItemButton>
            </ListItem>
             <ListItem  >
              <ListItemButton onClick={()=> {
                dispatch({ type: 'UPDATE_SECTION', payload: 1 });
              }}>
                <ListItemIcon>
                  <People/>
                </ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItemButton>
            </ListItem>
             <ListItem  >
              <ListItemButton onClick={()=> {
                dispatch({ type: 'UPDATE_SECTION', payload: 2 });
              }}>
                <ListItemIcon>
                  <Receipt/>
                </ListItemIcon>
                <ListItemText primary="Invoices" />
              </ListItemButton>
            </ListItem>
            <ListItem  >
              <ListItemButton onClick={()=> {
                dispatch({ type: 'UPDATE_SECTION', payload: 3 });
              }}>
                <ListItemIcon>
                  <Build/>
                </ListItemIcon>
                <ListItemText primary="Service" />
              </ListItemButton>
            </ListItem>
            <ListItem  >
              <ListItemButton onClick={()=> {
                dispatch({ type: 'UPDATE_SECTION', payload: 4 });
              }}>
                <ListItemIcon>
                  <CalendarMonth/>
                </ListItemIcon>
                <ListItemText primary="Appointments" />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}

export default SideBar