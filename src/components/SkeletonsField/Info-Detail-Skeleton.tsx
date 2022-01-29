import { Box, Skeleton } from '@mui/material'
import * as React from 'react'

export interface InfoDetailSkeletonProps {}

export function InfoDetailSkeleton(props: InfoDetailSkeletonProps) {
  return (
    <Box>
      <Skeleton height={60} />
      <Skeleton height={45} />
      <Skeleton height={140} />
      <Skeleton height={100} />
    </Box>
  )
}
