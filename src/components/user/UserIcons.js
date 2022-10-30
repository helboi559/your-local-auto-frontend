import { ShoppingCartOutlined } from '@mui/icons-material'
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import useCheckToken from '../hooks/useCheckToken'
import UserMenuOptions from './UserMenuOptions'

//when logged in replace login icon with this
const UserIcons = () => {
    useCheckToken()
    const {state:{currentUser},dispatch} = useValue()
    //   anchor user menu button list
    const [anchorUserMenu, setAnchorUserMenu] = useState(null);
    return (
    <Box>
    {/* shoppingcart icon  */}
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={20}>
          <ShoppingCartOutlined />
        </Badge>
      </IconButton>
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
            
            {/* if curr user doesnt have photo use first letter of logged in user */}
          <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenuOptions {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  )
}

export default UserIcons