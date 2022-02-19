import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Box, Container, Grid, Link, Theme, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  const TextComponent = styled('a')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '16px',
    color: 'rgb(142,142,142)',
    fontWeight: 300,
    margin: ' 16px 0 ',
    textDecoration: 'none',
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
          <Grid
            container
            spacing={3}
            sx={{
              textAlign: {
                xs: 'center',
                sm: 'left',
              },
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              sx={{
                mb: 2,
                display: { xs: 'flex', sm: 'block' },
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
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
                district Tan Bien, province Tay Ninh
              </TextComponent>

              <TextComponent href="mailto:tranvotam123@gmail.com">
                <EmailOutlinedIcon />
                tranvotam123@gmail.com
              </TextComponent>

              <TextComponent href="tel:0971151472">
                <LocalPhoneOutlinedIcon />
                +84 971151472
              </TextComponent>

              <Box
                sx={{
                  display: 'flex',
                  align: 'center',
                  '& > a + a': {
                    ml: 2,
                  },
                }}
              >
                <Link
                  sx={{
                    cursor: 'pointer',
                  }}
                  underline="none"
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=100020256826562"
                >
                  <FacebookOutlinedIcon
                    sx={{
                      color: (theme: Theme) => theme.palette.primary.main,
                    }}
                  />
                </Link>

                <Link
                  sx={{
                    cursor: 'pointer',
                  }}
                  underline="none"
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=100020256826562"
                >
                  <InstagramIcon
                    sx={{
                      background: (theme: Theme) =>
                        `-webkit-linear-gradient(${theme.palette.error.light}, ${theme.palette.warning.light}, ${theme.palette.success.light})`,
                      webkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      // color: (theme: Theme) => theme.palette.warning.light,
                    }}
                  />
                </Link>

                <Link
                  sx={{
                    cursor: 'pointer',
                  }}
                  underline="none"
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/NguyenHongThaiii"
                >
                  <GitHubIcon sx={{ color: '#000' }} />
                </Link>

                <Link
                  sx={{
                    cursor: 'pointer',
                  }}
                  underline="none"
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.youtube.com/channel/UCC19sOvPaEU5jaDKaFbBFCQ"
                >
                  <YouTubeIcon sx={{ color: (theme: Theme) => theme.palette.error.main }} />
                </Link>
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
