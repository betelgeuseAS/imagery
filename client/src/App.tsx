import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { createDesign } from './mui'
import { RootState } from './redux/store'

import { Routing } from './router'

import 'react-toastify/dist/ReactToastify.css'

const App: FC = (): JSX.Element => {
  const themeMode = useSelector((state: RootState) => state.uiState.themeMode)
  const theme = useMemo(() => createDesign(themeMode), [themeMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />

      <Routing />
    </ThemeProvider>
  )
}

export default App
