import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
} from '@mui/material'
import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Category, ListParams } from '../../../models'
import queryString from 'query-string'
import Search from '@mui/icons-material/Search'

export interface ProductListFilterProps {
  categoryList: Category[]
  onChange: (value: ListParams) => void
}

export default function ProductListFilter({ categoryList, onChange }: ProductListFilterProps) {
  const location = useLocation()
  const timeoutRef = useRef<any>()
  const searchRef = useRef<HTMLInputElement>()
  const value = useMemo<any>(() => {
    const type = queryString.parse(location.search).type
    return type || ''
  }, [location.search])

  const order = useMemo<any>(() => {
    const order = queryString.parse(location.search)._order
    if (order === 'asc') return 'price.asc'
    if (order === 'desc') return 'price.desc'
    return ''
  }, [location.search])

  const defaultValue = useMemo<any>(() => {
    const name_like = queryString.parse(location.search)?.name_like
    return name_like
  }, [location.search])
  const handleSelectChange = (e: SelectChangeEvent<{ name: string; value: string }>) => {
    if (!onChange) return

    const newValue = e.target.value
    const newFilters = {
      _page: 1,
      type: newValue === '' ? undefined : newValue,
    }
    onChange(newFilters)
  }
  const handleOnSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const newValue = e.target.value
      const newFilters = {
        _page: 1,
        name_like: newValue,
      }
      onChange(newFilters)
    }, 300)
  }

  const handleSortChange = (e: SelectChangeEvent<{ name: string; value: unknown }>) => {
    if (!onChange) return
    const newValue = e.target.value
    const [_sort, _order] = (newValue as string).split('.')
    const newFilters = {
      _page: 1,
      _sort,
      _order,
    }
    onChange(newFilters)
  }
  return (
    <Box sx={{ borderBottom: (theme: Theme) => `1px solid ${theme.palette.grey[400]}`, pb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search By Name"
              defaultValue={defaultValue || ''}
              endAdornment={<Search />}
              inputRef={searchRef}
              onChange={handleOnSearchChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="searchByType">Search By Type</InputLabel>
            <Select
              labelId="searchByType"
              label="Search By Type"
              value={value}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categoryList.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="searchByPrice">Search By Price</InputLabel>
            <Select
              labelId="searchByPrice"
              label="Search By Price"
              value={order}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>

              <MenuItem value="price.asc">
                <em>Increase</em>
              </MenuItem>
              <MenuItem value="price.desc">
                <em>Decrease</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}
