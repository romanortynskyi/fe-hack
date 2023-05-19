import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from '~/redux/store'
import Routes from '~/types/enums/routes'
import HeaderTabs from '~/containers/header-tabs'

const Main: FC = () => {
  const navigate = useNavigate()
  const { user, isFetchingGetMe } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user && !isFetchingGetMe) {
      navigate(Routes.Login, { replace: true })
    }
  }, [user, isFetchingGetMe, navigate])

  return (
    <div>
      <HeaderTabs />
    </div>
  )
}

export default Main
