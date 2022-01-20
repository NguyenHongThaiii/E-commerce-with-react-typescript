import { Box, Container } from '@mui/material'
import * as React from 'react'
import Footer from '../../components/Footer/Footer'
import Delivery from './components/Delivery'
import OurCategory from './components/OurCategories/Our-Category'
import OurProduct from './components/OurProducts/Out-Product'
import SwiperFeature from './components/Swiper/Swiper'

export interface HomePageProps {}

export default function HomePage(props: HomePageProps) {
  return (
    <Box>
      <SwiperFeature />
      <Container>
        <OurCategory />
        <OurProduct />
        <Delivery />
      </Container>
    </Box>
  )
}
