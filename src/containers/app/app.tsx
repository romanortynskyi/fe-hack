import { CssBaseline, ThemeProvider } from '@mui/material'
import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '~/components/Navbar/Navbar'

import Progress from '~/components/progress'
import { authActions } from '~/redux/auth.slice'
import { useDispatch, useSelector } from '~/redux/store'
import theme from '~/styles/app-theme/custom-mui.styles'

const App: FC = () => {
  const dispatch = useDispatch()
  const { isFetchingGetMe } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(authActions.getMe())
  }, [dispatch])

  return isFetchingGetMe ? <Progress /> : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Navbar /> */}
      <Outlet />
    </ThemeProvider>
  )
}

export default App
