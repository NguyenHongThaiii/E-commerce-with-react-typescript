import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { RootState } from 'app/store'
import React from 'react'
import { useSelector } from 'react-redux'

export interface SidebarProps {
  status: boolean
  onClick: (newStatus: boolean) => void
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

  const list = (anchor: string) => (
    <Box sx={{ width: 200 }}>
      <List>
        <ListItem button>
          <Button disableRipple={true}>Trang chủ</Button>
        </ListItem>
        <ListItem button>
          <Button disableRipple={true}>Sản phẩm</Button>
        </ListItem>
        <ListItem button>
          <Button disableRipple={true}>Login/Register</Button>
        </ListItem>
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
