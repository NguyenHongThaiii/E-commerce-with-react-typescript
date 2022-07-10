import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography } from '@mui/material'
import { QuantityField } from 'components/FieldControls'
import { Product, QuantityState } from 'models'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
export interface ProductDetailFormProps {
  onSubmit: (formValues: QuantityState) => void
  initialValues: QuantityState
  product: Product
}

export default function ProductDetailForm({
  initialValues,
  onSubmit,
  product,
}: ProductDetailFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const schema = yup.object({
    quantity: yup
      .number()
      .required('Please enter your quantity')
      .integer('Quantity is integer')
      .min(1, 'Quantity is min 1')
      .max(20, 'Quantity is max 20')
      .typeError('Quantity is number'),
  })
  const form = useForm<QuantityState>({
    mode: 'onSubmit',
    defaultValues: initialValues,
    // resolver: yupResolver(schema),
  })
  const { handleSubmit, control } = form
  const handleOnSubmit = async (formValues: QuantityState) => {
    if (!onSubmit || (product?.mountSold as number) < formValues.quantity) {
      alert('Purchase quantity is too large')
      return
    }
    if (typeof +formValues.quantity !== 'number' || formValues.quantity.toString() === '') {
      alert('Data pass is invalid')
      return
    }
    setLoading(true)
    setTimeout(async () => {
      await onSubmit(formValues)
      setLoading(false)
    }, 1000)
  }
  return (
    <Box sx={{}}>
      <form onSubmit={handleSubmit(handleOnSubmit)} autoComplete="off">
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
          <QuantityField
            control={control}
            name="quantity"
            label="Quantity"
            form={form}
            product={product}
          />
          <Typography sx={{ ml: 2, color: '#757575', fontSize: '14px' }}>
            {product?.mountSold} products are available
          </Typography>
        </Box>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
          sx={{ mt: 2, maxWidth: '200px' }}
        >
          Add to cart
        </Button>
      </form>
    </Box>
  )
}
