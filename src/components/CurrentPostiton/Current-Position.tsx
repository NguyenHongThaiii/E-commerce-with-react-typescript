import { Box, Typography, Breadcrumbs } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import { Link } from 'react-router-dom'

export interface CurrentState {
  href: string
  name: string
}

export interface CurrentPositionProps {
  current: string
  positionList?: CurrentState[]
}

export default function CurrentPosition({ current, positionList = [] }: CurrentPositionProps) {
  return (
    <Box
      sx={{
        minHeight: 36,
        backgroundColor: '#fff',
        mb: 4,

        display: 'flex',
        alignItems: 'center',
        pl: 2,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',

            '& > a': {
              color: '#878787',
              textDecoration: 'none',
            },

            '& > a:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          <Link to="/">Home</Link>
        </Typography>

        {positionList.map((position) => (
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',

              '& > a': {
                color: '#878787',
                textDecoration: 'none',
              },

              '& > a:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />

            <Link to={`${position.href}`}> {position.name}</Link>
          </Typography>
        ))}
        {current && (
          <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
            <ProductionQuantityLimitsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {current}
          </Typography>
        )}
      </Breadcrumbs>
    </Box>
  )
}