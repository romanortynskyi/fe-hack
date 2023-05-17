import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

import Routes from '~/types/enums/routes'
import LoginForm from '~/containers/login-form'
import { useSelector } from '~/redux/store'

const Login: FC = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      navigate(Routes.Main, { replace: true })
    }
  }, [user, navigate])

  return (
    <Container sx={{ mt: 6 }}>
      <LoginForm />
    </Container>
  )
}

export default Login
