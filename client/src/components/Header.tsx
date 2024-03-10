import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { LoadingButton as _LoadingButton } from '@mui/lab'

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  color: #222;
  font-weight: 500;
  border: 2px solid #222;
  margin-right: 1rem;
  &:hover {
    transform: translateY(-2px);
  }
`

const Header = () => {
  const navigate = useNavigate()

  return (
    <>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer', color: '#222', fontWeight: 700 }}>
            Imagery
          </Typography>
          <Box display="flex" sx={{ ml: 'auto' }}>
            {/*{user && user?.role === 'admin' && (*/}
            {/*  <LoadingButton sx={{ ml: 2, border: '2px solid #2363eb' }} onClick={() => navigate('/admin')}>*/}
            {/*    Admin*/}
            {/*  </LoadingButton>*/}
            {/*)}*/}
          </Box>
        </Toolbar>
      </Container>
    </>
  )
}

export default Header
