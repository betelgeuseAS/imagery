import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Typography, Button } from '@mui/material'

import { routes } from '../router'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <Button onClick={() => navigate(routes.Login.relativePath)}>Login</Button>
      <Typography sx={{ display: 'inline', mx: 1 }}>|</Typography>
      <Button onClick={() => navigate(routes.Register.relativePath)}>Register</Button>
    </Box>
  )
}
