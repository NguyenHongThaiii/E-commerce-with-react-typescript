import { Box, Theme } from '@mui/material'
import { Product } from 'models'
import React, { useState } from 'react'
// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Swiper, SwiperSlide } from 'swiper/react'

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs])

export interface PreviewImageDetailProps {
  product: Product
}

export default function PreviewImageDetail({ product }: PreviewImageDetailProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <Box
      sx={{
        p: 2,
        border: (theme: Theme) => `1px solid ${theme.palette.grey[400]}`,
        borderRadius: 3,
      }}
    >
      <Swiper loop={true} navigation={true} thumbs={{ swiper: thumbsSwiper }} className="mySwiper2">
        {product?.sliderList?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt={item} width="100%" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box sx={{ mb: 1, border: '1px solid #878787' }}></Box>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        slidesPerView={4}
        freeMode={true}
        spaceBetween={10}
        watchSlidesProgress={true}
        className="mySwiper"
      >
        {product?.sliderList?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt={item} width="100%" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}