import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from '~/redux/store'
import { Outlet } from 'react-router-dom'

import { authApi } from '~/redux/auth.api'
import LocalStorageKeys from '~/types/enums/local-storage-keys'
import { authActions } from '~/redux/auth.slice'

const App: FC = () => {
  const dispatch = useDispatch()
  const [getMe, { isLoading: isLoadingGetMe }] = authApi.endpoints.getMe.useLazyQuery()

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(LocalStorageKeys.Token)

      if (token) {
        try {
          const user = await getMe(token).unwrap()
  
          dispatch(authActions.setUser(user))
        }
  
        catch(error) {
          console.error(error)
        }
      }
    })()
  }, [])

  return (
    <Outlet />
  )
}

export default App
