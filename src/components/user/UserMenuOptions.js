import { LogoutSharp, Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { logout } from '../../actions/user'
import { useValue } from '../../context/ContextProvider'
import useCheckToken from '../hooks/useCheckToken'
import Profile from './Profile'


const UserMenuOptions = ({anchorUserMenu, setAnchorUserMenu }) => {
    useCheckToken()
    const {state:{currentUser},dispatch} = useValue()
    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
    }
    const handleLogout = () => {
        logout(dispatch)
    }
    return (
        <>
            <Menu
            // sets position of menu 
            anchorEl={anchorUserMenu}
            // opens on true 
            open={Boolean(anchorUserMenu)}
            onClose={handleCloseUserMenu}
            // closes on any click 
            onClick={handleCloseUserMenu}
            >
                <MenuItem onClick={()=> dispatch({type:'UPDATE_PROFILE',payload:{open:true,file:null, photoURL:currentUser?.photoURL}})}>
                    <ListItemIcon>
                        <Settings fontSize='small'/>
                    </ListItemIcon>
                    My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutSharp fontSize='small'/>
                    </ListItemIcon>
                    Logout
                </MenuItem>

            </Menu>
            <Profile/>
        </>
  )
}

export default UserMenuOptions