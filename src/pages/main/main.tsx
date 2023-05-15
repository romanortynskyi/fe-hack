import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from '~/redux/store'
import Routes from '~/types/enums/routes'

const Main = () => {
  const navigate = useNavigate()
  const { user, isFetchingGetMe } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user && !isFetchingGetMe) {
      navigate(Routes.Login, { replace: true })
    }
  }, [user, isFetchingGetMe, navigate])

  return (
    <div>
      hello,
      {user?.firstName}
    </div>
  )
}

export default Main
