import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'

export interface SwiperFeatureProps {}

export default function SwiperFeature(props: SwiperFeatureProps) {
  const newSliders = [
    'https://js-ecommerce-api.herokuapp.com/asset/img/Slider_1.jpg',
    'https://js-ecommerce-api.herokuapp.com/asset/img/Slider_2_1.jpg',
    'https://js-ecommerce-api.herokuapp.com/asset/img/Slider_3.jpg',
  ]

  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  SwiperCore.use([Autoplay, Navigation])

  const handleOnClick = () => {
    navigate('/products')
  }
  return (
    <Box sx={{ position: 'relative' }}>
      <Swiper
        navigation={true}
        onSlideChange={(swiper) => setIndex(swiper.realIndex)}
        onSwiper={(swiper) => null}
        loop={true}
        slidesPerView="auto"
        loopedSlides={3}
        initialSlide={0}
        normalizeSlideIndex={true}
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {newSliders.map((imageUrl, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <Box
              sx={{
                '& > img': {
                  height: {
                    lg: '90vh',
                    xs: '100%',
                  },
                },
              }}
            >
              <img
                src={imageUrl || 'https://via.placeholder.com/1280'}
                alt={'https://via.placeholder.com/1280'}
                width="100%"
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          left: index === 0 ? '12%' : '43%',
          zIndex: 1,
          maxWidth: '550px',
          transition: 'all 1.5s ease',
        }}
      >
        <Typography
          sx={{
            mb: 1,
            fontSize: {
              sm: 18,
              xs: 16,
            },
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          Fashion Trend 2022
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: {
              lg: 50,
              md: 42,
              sm: 32,
              xs: 16,
            },
            mb: 1,
          }}
        >
          FLASH SALE OF 50%
        </Typography>
        <Typography
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            mb: 2,
          }}
        >
          Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat nonproident
        </Typography>
        <Button variant="outlined" color="inherit" onClick={handleOnClick}>
          Shop now
        </Button>
      </Box>
    </Box>
  )
}
