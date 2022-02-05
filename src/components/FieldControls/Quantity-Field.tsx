import React, { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'
import { Box, IconButton, TextField, Theme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
export interface QuantityFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  control: Control<any>
  form: any
}

export function QuantityField({ name, label, control, form, ...inputProps }: QuantityFieldProps) {
  const { setValue } = form
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  })

  return (
    <Box
      sx={{
        maxWidth: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 4,
      }}
    >
      <IconButton
        size="small"
        disabled={Number.parseInt(value) <= 1}
        sx={{
          border: (theme: Theme) => `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 0,
          mr: 2,
        }}
        onClick={() => setValue(name, Number.parseInt(value) < 1 ? 1 : Number.parseInt(value) - 1)}
      >
        <RemoveIcon />
      </IconButton>
      <Box>
        <TextField
          size="small"
          onChange={onChange}
          onBlur={onBlur}
          value={Number.parseInt(value) || ''}
          name={name}
          label={label}
          error={invalid}
          helperText={error?.message}
          inputRef={ref}
          inputProps={{ ...inputProps, inputMode: 'numeric' }}
        />
      </Box>
      <IconButton
        size="small"
        disabled={Number.parseInt(value) > 20}
        sx={{
          border: (theme: Theme) => `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 0,
          ml: 2,
        }}
        onClick={() => setValue(name, Number.parseInt(value) > 20 ? 1 : Number.parseInt(value) + 1)}
      >
        <AddIcon />
      </IconButton>
    </Box>
  )
}
