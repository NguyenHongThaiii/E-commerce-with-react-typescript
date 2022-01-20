import { Box, Grid, Theme, Typography, Container } from '@mui/material'
import React from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { styled } from '@mui/material/styles'
export interface FooterProps {}

export default function Footer(props: FooterProps) {
  const TextComponent = styled('p')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '16px',
    color: 'rgb(142,142,142)',
    fontWeight: 300,
    '& > svg': {
      marginRight: theme.spacing(1),
    },
  }))

  const HeadTypoComponent = styled('p')(({ theme }) => ({
    color: '#000',
    fontWeight: 500,
    fontSize: '18px',
    margin: 0,
  }))

  const TypoComponent = styled('p')(({ theme }) => ({
    fontSize: '16px',
    color: 'rgb(142,142,142)',
    fontWeight: 300,
  }))

  return (
    <Box mt={8}>
      <Box sx={{ backgroundColor: '#eaeaea' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <Typography
                component="h3"
                variant="h4"
                sx={{
                  color: 'rgb(64, 81, 182)',
                  fontFamily: `"Libre Baskerville", serif`,
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  mt: '-10px',
                }}
              >
                E-commerce
              </Typography>

              <TextComponent>
                <AddLocationAltOutlinedIcon />
                ấp Thạnh Sơn, xã Thạnh Tây, huyện Tân Biên, tỉnh Tây Ninh
              </TextComponent>

              <TextComponent>
                <EmailOutlinedIcon />
                tranvotam123@gmail.com
              </TextComponent>

              <TextComponent>
                <LocalPhoneOutlinedIcon />
                +84 971151472
              </TextComponent>

              <Box
                sx={{
                  display: 'flex',
                  align: 'center',
                  '& > svg + svg': {
                    ml: 2,
                  },
                }}
              >
                <FacebookOutlinedIcon
                  sx={{ color: (theme: Theme) => theme.palette.primary.main }}
                />
                <InstagramIcon
                  sx={{
                    background: (theme: Theme) =>
                      `-webkit-linear-gradient(${theme.palette.error.light}, ${theme.palette.warning.light}, ${theme.palette.success.light})`,
                    webkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    // color: (theme: Theme) => theme.palette.warning.light,
                  }}
                />
                <GitHubIcon sx={{ color: '#000' }} />
                <YouTubeIcon sx={{ color: (theme: Theme) => theme.palette.error.main }} />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <HeadTypoComponent>Categories</HeadTypoComponent>
              <TypoComponent>Blazer</TypoComponent>
              <TypoComponent>Jean Shirt</TypoComponent>
              <TypoComponent>Hoodie</TypoComponent>
              <TypoComponent>Cuffed Beanie</TypoComponent>
              <TypoComponent>Denim Shirt</TypoComponent>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <HeadTypoComponent>Information</HeadTypoComponent>
              <TypoComponent>About Us</TypoComponent>
              <TypoComponent>Contact Us</TypoComponent>
              <TypoComponent>Terms {'&'} Conditions</TypoComponent>
              <TypoComponent>Returns {'&'} Exchanges</TypoComponent>
              <TypoComponent>Shipping {'&'} Delivery</TypoComponent>
              <TypoComponent>Privacy Policy</TypoComponent>
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <HeadTypoComponent>Quick Links</HeadTypoComponent>
              <TypoComponent>Store Location</TypoComponent>
              <TypoComponent>My Account</TypoComponent>
              <TypoComponent>Accessories</TypoComponent>
              <TypoComponent>Orders Tracking</TypoComponent>
              <TypoComponent>Size Guide</TypoComponent>
              <TypoComponent>FAQs</TypoComponent>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Typography
        sx={{
          textAlign: 'center',
          p: (theme: Theme) => theme.spacing(2, 0),
          color: 'rgb(135, 135, 135)',
          fontSize: '14px',
          fontWeight: 300,
        }}
      >
        Copyright © 2022 E-Commerce. All rights reserved. Powered by ThaiPei
      </Typography>
    </Box>
  )
}
