import { useState, FC, MouseEvent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import {
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps
} from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

type IFormInputPasswordProps = {
  name: string
  label: string | JSX.Element
} & OutlinedInputProps

const FormInputPassword: FC<IFormInputPasswordProps> = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl fullWidth variant="outlined" size={otherProps.size} sx={{ my: 1 }}>
          <InputLabel htmlFor="html-form" error={!!errors[name]}>
            {label}
          </InputLabel>

          <OutlinedInput
            {...field}
            fullWidth
            id="html-form"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  size="small"
                  edge="end">
                  {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            }
            error={!!errors[name]}
            label={label}
            {...otherProps}
          />

          <FormHelperText error={!!errors[name]}>
            {errors[name] ? (errors[name]?.message as unknown as string) : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default FormInputPassword
