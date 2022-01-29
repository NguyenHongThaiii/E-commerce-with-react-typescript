import NotFound from 'components/NotFound/Not-Found'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartPage from './pages/Cart-Page'

export interface ICartFeatureProps {}

export default function CartFeature(props: ICartFeatureProps) {
  return (
    <Routes>
      <Route path="" element={<CartPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
