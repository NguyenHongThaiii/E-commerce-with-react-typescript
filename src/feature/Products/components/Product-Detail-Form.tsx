import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { QuantityField } from 'components/FieldControls'
import { QuantityState } from 'models'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
export interface ProductDetailFormProps {
  onSubmit: (formValues: QuantityState) => void
  initialValues: QuantityState
}

export default function ProductDetailForm({ initialValues, onSubmit }: ProductDetailFormProps) {
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
    resolver: yupResolver(schema),
  })
  const { handleSubmit, control } = form
  const handleOnSubmit = async (formValues: QuantityState) => {
    if (!onSubmit) return
    setLoading(true)
    setTimeout(async () => {
      await onSubmit(formValues)
      setLoading(false)
    }, 1000)
  }
  return (
    <Box sx={{ maxWidth: '200px' }}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <QuantityField control={control} name="quantity" label="Quantity" form={form} />
        <Button variant="contained" fullWidth type="submit" disabled={loading} sx={{ mt: 2 }}>
          Add to cart
        </Button>
      </form>
    </Box>
  )
}
