import { Box, Typography } from '@mui/material'
import { RootState } from 'app/store'
import firebase from 'firebase/compat/app'
import React, { useEffect } from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  // Configure FirebaseUI.
  const user = useSelector((state: RootState) => state.auth.user)
  const currentUser = firebase.auth().currentUser

  if (currentUser && user.uid) {
    return <Navigate to="/" />
  }

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  }

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          background: 'linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))',
          width: '100%',
          '& > img': { width: '100%', height: '100%', minHeight: '100vh', objectFit: 'cover' },
        }}
      >
        <img src="/login_background.png" alt="/login_background.png" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          minWidth: { xs: '320px', sm: '640px' },
          minHeight: { xs: '300px', sm: '600px' },
          backgroundColor: '#fff',
          top: { xs: `calc(50% - 150px)`, sm: `calc(50% - 300px)` },
          left: { xs: `calc(50% - 200px)`, sm: `calc(50% - 320px)` },
          textAlign: 'center',
          borderRadius: 2,
          py: 6,
          px: 2,
          '& button': {
            borderRadius: 6,
          },
        }}
      >
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontFamily: `"Montserrat", Arial, Helvetica, sans-serif`,
              mb: 4,
              textAlign: 'center',
              fontSize: {
                xs: '20px',
                sm: '28px',
              },
            }}
          >
            Login to E-commerce shop
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& button': {
                maxWidth: '330px',
                width: '320px',
                textAlign: 'center',
                display: 'flex',
                columnGap: 6,
                fontWeight: '600',
                boxShadow: 'none',
                border: '2px solid #dce0e3',
                '&:hover': {
                  backgroundColor: '#dce0e3 !important',
                  transition: 'all 0.05s linear',
                },
              },
            }}
          >
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
