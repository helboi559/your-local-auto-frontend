import { AccountCircleSharp, Menu , CarRepairSharp, People, Inventory2, Receipt, Build, CalendarMonth } from '@mui/icons-material'
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Container, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import React, { useState, useEffect, useRef} from 'react'
import { useValue } from '../context/ContextProvider'
import UserIcons from './user/UserIcons'
import Inventory from './inventory/Inventory'
import Customers from './customers/Customers'
import Invoices from './invoices/Invoices'
import SideBar from './SideBar'
import Service from './service/Service'
import Appointments from './appointments/Appointments'
import Protected from './protected/Protected'
const NavBar = () => {
    const {state:{currentUser,section},dispatch} = useValue()
    // const [section,setSection] = useState(0)
    const ref = useRef();
    const [isOpen,setIsOpen] = useState(false)
    // console.log("drawer open: ",isOpen)
    const FUSCHIA = '#9b5284';
    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [section]);
  
  return (
    <Box ref={ref}>
    
    
     {
            {
                
            0: <Protected><Customers/></Protected>,
            1: <Protected><Inventory/></Protected>,
            2: <Protected><Invoices /></Protected>,
            3: <Protected><Service/></Protected>,
            4: <Protected><Appointments/></Protected>,

            }[section]
        }
    <AppBar  color="primary">
        {/* creates top colored bar  */}
        <Container maxWidth='xl'>
            {/* disable padding on toolbar*/}
            <Toolbar disableGutters>
                {/* similar as DIV  */}
                <Box
                // places distance between component- margin right
                sx={{mr:1}}
                >
                    {/* similar as button  */}
                    <IconButton
                    size='large'
                    //color of icon below
                    color='inherit'
                    onClick={()=> setIsOpen(true)}
                    >
                        {/* menu hamburger icon Via @mui icons */}
                        <Menu/>                        
                    </IconButton>
                </Box>
                {/* defualt icon  */}
                 <CarRepairSharp 
                 style={{color:FUSCHIA}}
                 fontSize='large'
                 sx={{mr:1}}
                 />
                <Typography
                    variant='h6'
                    component='h1'
                    noWrap
                    sx={{
                        flexGrow:1,
                        display: {xs:'none',md:"flex"}
                    }}
                    >
                        Your Local Auto
                </Typography>
                <Typography
                    variant='h6'
                    component='h1'
                    noWrap
                    sx={{
                        flexGrow:1,
                        display: {xs:'flex',md:"none"}
                    }}
                    >
                        Your Local Auto
                </Typography>
                {!currentUser ? (
                    <Button
                    color='inherit'
                    startIcon={<AccountCircleSharp/>}
                    //onclick, state is set to true to open UserLogin component
                    onClick={()=> dispatch({type:"OPEN_LOGIN"})}
                >
                    Login
                </Button>
                ):
                (<UserIcons/>
                )}
                
                
            </Toolbar>
        </Container>
    </AppBar>
     
    
    <Paper
        elevation={3}
        sx={{position:"fixed", bottom:0,left:0,right:0,zIndex:0, 
        display: { xs: 'block', sm: 'none', md: 'none' }}}
        
    >
        <BottomNavigation
        showLabels
        value={section}
        onChange={(e,newValue)=> dispatch({type:'UPDATE_SECTION',payload:newValue}) }
        >
            <BottomNavigationAction sx={{mr:-1}}label="Customers" icon={<People/>}/>
            <BottomNavigationAction sx={{mr:-1}}label="Inventory" icon={<Inventory2/>}/>
            <BottomNavigationAction sx={{mr:-1}}label="Invoices" icon={<Receipt/>}/>
            <BottomNavigationAction label="Service" icon={<Build/>}/>
            <BottomNavigationAction sx={{mr:1}} label="Appointments" icon={<CalendarMonth/>}/>
        </BottomNavigation>
    </Paper>
    <SideBar {...{isOpen,setIsOpen}}/>
    </Box>
  )
}

export default NavBar

