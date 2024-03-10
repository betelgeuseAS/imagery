import React from 'react'

import { Box, CircularProgress } from '@mui/material'

type Props = {
  show?: boolean
}

const Loader = ({ show }: Props) => (
  <Box sx={{ display: show ? 'block' : 'none' }}>
    <CircularProgress />
  </Box>
)

export default Loader
