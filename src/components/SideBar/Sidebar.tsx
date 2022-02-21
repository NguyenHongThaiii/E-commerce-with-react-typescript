import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { RootState } from 'app/store'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { Modal, styled, Typography } from '@mui/material'
import { logout } from 'app/authSlice'
export interface SidebarProps {
  status: boolean
  onClick: (newStatus: boolean) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
}

export default function Sidebar({ status, onClick }: SidebarProps) {
  const userData = useSelector((state: RootState) => state.auth.user)
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      (event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')) ||
      !onClick
    ) {
      return
    }
    onClick(open)
  }

  const LinkStyled = styled(Button)(({}) => ({
    fontWeight: '500',
  }))

  const list = (anchor: string) => (
    <Box sx={{ width: 200 }}>
      <List
        sx={{
          '& > a:hover , & > li:hover': {
            backgroundColor: '#ccc',
            cursor: 'pointer',
          },
        }}
      >
        {userData && (
          <ListItem
            button
            sx={{
              '&  img': {
                borderRadius: 15,
                overflow: 'hidden',
              },
            }}
          >
            <Link to="/">
              <img src={userData.photoURL} alt={userData.displayName} width="100px" />
            </Link>
          </ListItem>
        )}
        <ListItem component={Link} to="/">
          <LinkStyled disableRipple={true}>Home page </LinkStyled>
        </ListItem>

        <ListItem component={Link} to="/products">
          <LinkStyled disableRipple={true}>Products</LinkStyled>
        </ListItem>

        {userData.email ? (
          <>
            <ListItem component={Link} to="/">
              <LinkStyled disableRipple={true}>My profile</LinkStyled>
            </ListItem>
            <ListItem onClick={handleOpen}>
              <LinkStyled disableRipple={true}>
                Logout
                <LogoutIcon sx={{ ml: 1 }} />
              </LinkStyled>
            </ListItem>
          </>
        ) : (
          <ListItem component={Link} to="/login">
            <LinkStyled disableRipple={true}>Login/Register</LinkStyled>
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  )

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch = useDispatch()

  const handleLogoutUser = () => {
    dispatch(logout())
    setOpen(false)
    toggleDrawer(false)
  }
  return (
    <div>
      <Drawer anchor="left" open={status} onClose={toggleDrawer(false)}>
        {list('left')}
      </Drawer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Are you sure you want to logout from this web ?
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleLogoutUser}>
              Logout
            </Button>

            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
