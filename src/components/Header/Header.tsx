import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../SideBar/Sidebar'

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  const [status, setStatus] = useState(false)

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

            <Box sx={{}}>
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
                <ButtonStyled to="/login">
                  <Button>Login</Button>
                </ButtonStyled>
              </Box>
              <IconButton>
                <ShoppingCartIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Sidebar status={status} onClick={handleToggleSidebar} />
    </Box>
  )
}
