import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Progress } from '~/components/progress'
import { authActions } from '~/redux/auth.slice'
import { useDispatch, useSelector } from '~/redux/store'

const App: FC = () => {
  const dispatch = useDispatch()
  const { isFetchingGetMe } = useSelector((state) => state.auth)
  
  useEffect(() => {
    dispatch(authActions.getMe())
  }, [dispatch])

  return isFetchingGetMe ? <Progress /> : <Outlet />
}

export default App
