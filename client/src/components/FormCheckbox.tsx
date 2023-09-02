import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, CheckboxProps, Checkbox, FormControlLabel, FormHelperText } from '@mui/material'

type IFormCheckboxProps = {
  name: string
  label: string | JSX.Element
} & CheckboxProps

const FormCheckbox: FC<IFormCheckboxProps> = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Controller
      control={control}
      defaultValue={false}
      name={name}
      render={({ field }) => (
        <FormControl>
          <FormControlLabel control={<Checkbox {...field} {...otherProps} />} label={label} />

          <FormHelperText>{errors[name] ? (errors[name]?.message as unknown as string) : ''}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default FormCheckbox
