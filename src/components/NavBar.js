import { LoginSharp, Menu , LocalMallSharp } from '@mui/icons-material'
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'

import React, { useState } from 'react'
import { useValue } from '../context/ContextProvider'
import UserIcons from './user/UserIcons'

const NavBar = () => {
    const {state:{currentUser},dispatch} = useValue()
    const [isOpen,setIsOpen] = useState(false)
    const user = {
        name:'test',
        }
  return (
    //Similar as Navbar
    <>
    
    <AppBar>
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
                    // onClick={()=> setIsOpen(true)}
                    >
                        {/* menu hamburger icon Via @mui icons */}
                        <Menu/>                        
                    </IconButton>
                </Box>
                {/* defualt icon  */}
                 <LocalMallSharp 
                 
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
                        Ecommerce Store
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
                        Ecommerce Store
                </Typography>
                {!currentUser ? (
                    <Button
                    color='inherit'
                    startIcon={<LoginSharp/>}
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
    </>
  )
}

export default NavBar