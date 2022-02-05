import Search from '@mui/icons-material/Search'
import {
  Box,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Theme,
  Typography,
} from '@mui/material'
import productsApi from 'api/productsApi'
import { ListParams, ListResponse, Product } from 'models'
import queryString from 'query-string'
import React, { ChangeEvent, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export interface SearchFormHeaderProps {}

export default function SearchFormHeader(props: SearchFormHeaderProps) {
  const [state, setState] = useState<Product[]>([])
  const [value, setValue] = useState<ListParams>({})
  const timeRef = useRef<any>(null)
  const searchRef = useRef<HTMLInputElement>()
  const navigate = useNavigate()

  const handleOnSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current)
    }

    timeRef.current = setTimeout(async () => {
      const name_like = e.target.value.trim()
      const queryParams = {
        _page: 1,
        _limit: 10,
        name_like,
      }
      try {
        const { data }: ListResponse<Product> = await productsApi.getAll(queryParams)
        setState(data)
        setValue(queryParams)
        if (data.length > 0 && name_like) {
          setAnchorEl(e.target)
        } else {
          setAnchorEl(null)
        }
      } catch (error) {
        console.log('Fail to fetch products by search', error)
      }
    }, 400)
  }

  //   Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickToDetailPage = (id: string, index: number) => {
    if (searchRef.current) {
      searchRef.current.value = state[index].name
    }

    if (id) {
      navigate(`/products/${id}`)
    }

    setAnchorEl(null)
  }

  const handleSearchIconClick = () => {
    navigate(`/products?name_like=${searchRef.current?.value}`)
  }

  const handleOnSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!searchRef.current?.value) return
    navigate(`/products?name_like=${searchRef.current?.value}`)
  }

  return (
    <Box component="form" onSubmit={handleOnSubmit}>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {state.length > 0 &&
          state.map((product: Product, index: number) => (
            <MenuItem onClick={() => handleClickToDetailPage(product.id, index)} key={product.id}>
              <Search sx={{ mr: 0.5 }} />
              {product.name}
            </MenuItem>
          ))}
        <Typography
          sx={{
            textAlign: 'center',
            mt: 1,
            '& >a ': { color: (theme: Theme) => theme.palette.primary.light },
          }}
        >
          <Link to={`/products?${queryString.stringify(value)}`} onClick={handleClose}>
            View All
          </Link>
        </Typography>
      </Menu>
      <Box onClick={handleClose}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel htmlFor="searchByName">Search By Name</InputLabel>
          <OutlinedInput
            id="searchByName"
            label="Search By Name"
            defaultValue=""
            endAdornment={
              <Search
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.7,
                  },
                }}
                onClick={handleSearchIconClick}
              />
            }
            inputRef={searchRef}
            onChange={handleOnSearchChange}
          />
        </FormControl>
      </Box>
    </Box>
  )
}
