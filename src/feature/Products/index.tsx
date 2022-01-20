import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import DetailPage from './pages/Detail-Page'
import ListPage from './pages/List-Page'

export interface ListingFeatureProps {}

export default function ListingFeature(props: ListingFeatureProps) {
  return (
    <Routes>
      <Route path="" element={<ListPage />} />
      <Route path=":productId" element={<DetailPage />} />
    </Routes>
  )
}
