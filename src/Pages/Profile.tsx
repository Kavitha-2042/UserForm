import React from 'react'

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,


} from '@mui/material'


const Profile = () => {

  return (
    <div>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href='/'> 
            Home
            </a>
            
          </Typography>
          <Button  ><a href="/changepassword">ChangePassword</a></Button>
          <Button  ><a href="/signout">Signout</a></Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Profile
