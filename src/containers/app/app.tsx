import { CssBaseline, ThemeProvider } from '@mui/material'
import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '~/components/navbar';

import Progress from '~/components/progress'
import { authActions } from '~/redux/auth.slice'
import { useDispatch, useSelector } from '~/redux/store'
import theme from '~/styles/app-theme/custom-mui.styles'
import LocalStorageKeys from '~/types/enums/local-storage-keys';

const App: FC = () => {
  const dispatch = useDispatch()
  const { isFetchingGetMe } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(authActions.getMe())
  }, [dispatch])

  const logout = () => {
    dispatch(authActions.setUser(null))
    localStorage.removeItem(LocalStorageKeys.Token)
  }

  return isFetchingGetMe ? <Progress /> : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onLogout={logout}/>
      <Outlet />
    </ThemeProvider>
  )
}

export default App
