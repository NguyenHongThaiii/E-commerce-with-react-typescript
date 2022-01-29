import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { RootState } from 'app/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { styled } from '@mui/material'
export interface SidebarProps {
  status: boolean
  onClick: (newStatus: boolean) => void
}

export default function Sidebar({ status, onClick }: SidebarProps) {
  const userData = useSelector((state: RootState) => state.auth.user)
  console.log('userData', userData)
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
            <ListItem>
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

  return (
    <div>
      <Drawer anchor="left" open={status} onClose={toggleDrawer(false)}>
        {list('left')}
      </Drawer>
    </div>
  )
}
