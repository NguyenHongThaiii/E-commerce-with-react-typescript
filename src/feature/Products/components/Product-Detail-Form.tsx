import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { QuantityField } from 'components/FieldControls'
import { Product, QuantityState } from 'models'
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
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form
  const handleOnSubmit = async (formValues: QuantityState) => {
    if (!onSubmit) return

    await onSubmit(formValues)
  }
  return (
    <Box sx={{ maxWidth: '200px' }}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <QuantityField control={control} name="quantity" label="Quantity" form={form} />
        <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }} disabled={isSubmitting}>
          Add to cart
        </Button>
      </form>
    </Box>
  )
}
