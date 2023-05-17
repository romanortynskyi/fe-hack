import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import Routes from '~/types/enums/routes'
import { useSelector } from '~/redux/store'
import ResetPasswordForm from '~/containers/reset-password-form'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { user, email, recoveryCode } = useSelector((state) => state.auth)


  useEffect(() => {
    if (user || !email || !recoveryCode) {
      navigate(Routes.Main, { replace: true })
    }
  }, [user, navigate])

  return (
    <Container sx={{ mt: 6 }}>
      <ResetPasswordForm />
    </Container>
  )
}

export default ResetPassword
