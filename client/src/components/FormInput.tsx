import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, TextFieldProps, TextField } from '@mui/material'

type IFormInputProps = {
  name: string
  label: string | JSX.Element
} & TextFieldProps

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            {...field}
            fullWidth
            label={label}
            error={!!errors[name]}
            helperText={errors[name] ? (errors[name]?.message as unknown as string) : ''}
            {...otherProps}
          />
        </FormControl>
      )}
    />
  )
}

export default FormInput
