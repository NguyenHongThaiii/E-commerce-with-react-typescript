import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SwiperCore, { Autoplay, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import sliderApi from '../../../../api/sliderApi'
import { ListResponse } from '../../../../models'
import { Slider } from '../../../../models/slider'

export interface SwiperFeatureProps {}

export default function SwiperFeature(props: SwiperFeatureProps) {
  const [sliders, setSliders] = useState<Slider[]>([])
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  SwiperCore.use([Autoplay, Navigation])

  useEffect(() => {
    ;(async () => {
      try {
        const { data }: ListResponse<Slider> = await sliderApi.getAll()
        setSliders(data)
      } catch (error) {
        console.log('Fail to fetch slider', error)
      }
    })()
  }, [])

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
        {sliders.map((slider, index) => (
          <SwiperSlide key={slider.id} virtualIndex={index}>
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
              <img src={slider.imageUrl} alt={slider.imageUrl} width="100%" />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          position: 'absolute',
          top: '35%',
          left: index === 0 ? '10%' : '50%',
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
          }}
        >
          Fashion Trend 2021
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            fontSize: {
              lg: 50,
              md: 42,
              sm: 32,
              xs: 24,
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
