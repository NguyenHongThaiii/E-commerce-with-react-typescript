import { Box, Grid, Typography } from '@mui/material'
import * as React from 'react'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
export interface DeliveryProps {}

export default function Delivery(props: DeliveryProps) {
  return (
    <Box mt={8} sx={{ textAlign: 'center' }}>
      <Typography
        component="span"
        variant="h5"
        sx={{
          position: 'relative',
          margin: '0 auto',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          '&::after': {
            content: `""`,
            height: 2,
            width: 60,
            position: 'absolute',
            top: '50%',
            left: '-75px',
            backgroundColor: '#000',
          },
          '&::before': {
            content: `""`,
            height: 2,
            width: 60,
            position: 'absolute',
            top: '50%',
            right: '-75px',
            backgroundColor: '#000',
          },
        }}
      >
        Delivery {'&'} returns
      </Typography>
      <Typography
        sx={{
          color: 'rgb(135,135,135)',
          fontStyle: 'italic',
          fontFamily: `"Libre Baskerville", serif`,
          mb: 3,
        }}
      >
        Custom static block for product detail
      </Typography>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  align: 'center',
                  justifyContent: 'center',
                  mb: 0.5,
                }}
              >
                <LocalShippingOutlinedIcon sx={{ mr: 1 }} />
                FREE SHIPPING
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#878787' }}>
                Free shipping on all US order or order above $200
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  align: 'center',
                  justifyContent: 'center',
                  mb: 0.5,
                }}
              >
                <HelpOutlineOutlinedIcon sx={{ mr: 1 }} />
                SUPPORT 24/7
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#878787' }}>
                Contact us 24 hours a day, 7 days a week
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  align: 'center',
                  justifyContent: 'center',
                  mb: 0.5,
                }}
              >
                <ReplayOutlinedIcon sx={{ mr: 1 }} />
                30 DAYS RETURN
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#878787' }}>
                Simply return it within 30 days for an exchange.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  align: 'center',
                  justifyContent: 'center',
                  mb: 0.5,
                }}
              >
                <CreditCardOutlinedIcon sx={{ mr: 1 }} />
                100% PAYMENT SECURE
              </Typography>
              <Typography sx={{ fontSize: '16px', color: '#878787' }}>
                We ensure secure payment with PEV
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
