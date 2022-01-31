import * as React from 'react'
import { Box, Skeleton } from '@mui/material'

export interface AvatarSkeletonProps {}

export function AvatarSkeleton(props: AvatarSkeletonProps) {
  return (
    <Box
      sx={{
        minWidth: '166px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Skeleton width={60} height={40} />
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton width={60} height={40} />
    </Box>
  )
}
