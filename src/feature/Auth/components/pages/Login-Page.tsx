import { Box, Typography } from '@mui/material'
import { RootState } from 'app/store'
import firebase from 'firebase/compat/app'
import React from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  // Configure FirebaseUI.
  const user = useSelector((state: RootState) => state.auth.user)
  if (user.email) {
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
    <Box
      sx={{
        position: 'fixed',
        minWidth: '500px',
        minHeight: '300px',
        backgroundColor: '#ccc',
        top: `calc(50% - 150px)`,
        left: `calc(50% - 250px)`,
        textAlign: 'center',
        borderRadius: 2,
        p: 3,
        '& button': {
          borderRadius: 6,
        },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{ fontWeight: 'bold', fontFamily: `"Montserrat", Arial, Helvetica, sans-serif`, mb: 4 }}
      >
        Welcome to the S n o w F o x
      </Typography>
      <Box>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Box>
    </Box>
  )
}
