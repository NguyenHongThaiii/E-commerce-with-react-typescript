import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { logout } from 'app/authSlice'
import { RootState } from 'app/store'
import Sidebar from 'components/SideBar/Sidebar'
import React, { MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const [status, setStatus] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userState = useSelector((state: RootState) => state.auth.user)

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: theme.palette.grey[300],
    '&:hover': {
      boxShadow: theme.shadows[1],
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }))

  const ButtonStyled = styled(Link)(({}) => ({
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: '500',
    '& > button': {
      color: '#000',
      textTransform: 'none',
    },
  }))

  const handleToggleSidebar = (newStatus: boolean) => {
    setStatus(newStatus)
  }

  // Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogoutUser = () => {
    dispatch(logout())
    setAnchorEl(null)

    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position="static">
        <Container>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: { sm: 0 },
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              sx={{
                display: {
                  xs: 'inline-block',
                  sm: 'none',
                },
                // flexGrow: 1,
                textAlign: 'left',
                alignSelf: 'center',
                mt: 0.5,
              }}
              onClick={() => handleToggleSidebar(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontFamily: 'Libre Baskerville, serif',
                fontSize: '24px',
                display: {
                  xs: 'none',
                  sm: 'block',
                },
                '& > a': {
                  color: '#000000',
                  textDecoration: 'none',
                },
              }}
            >
              <Link to="/">E-commerce</Link>
            </Typography>

            <Box sx={{ textAlign: 'center' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>

            {userState.email ? (
              <Box>
                <Box
                  component="span"
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'inline-block',
                    },
                  }}
                >
                  <ButtonStyled to="/products">
                    <Button>Products</Button>
                  </ButtonStyled>

                  <IconButton sx={{ mx: 0.5 }} onClick={handleClick}>
                    <Avatar
                      alt="Remy Sharp"
                      src={userState.photoURL}
                      sx={{ width: '24px', height: '24px' }}
                    />
                  </IconButton>
                </Box>
                <IconButton>
                  <ShoppingCartIcon />
                </IconButton>
              </Box>
            ) : (
              <Box
                component="span"
                sx={{
                  '&>a': {
                    textDecoration: 'none',
                  },
                }}
              >
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ px: 2.5, py: 0.5, textTransform: 'none', fontSize: '16px' }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            )}
            {/* Menu */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogoutUser}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <Sidebar status={status} onClick={handleToggleSidebar} />
    </Box>
  )
}