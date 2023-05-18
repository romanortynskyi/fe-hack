import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

import Routes from '~/types/enums/routes'
import { useSelector } from '~/redux/store'
import VerifyRecoveryCodeForm from '~/containers/verify-recovery-code-form'

const VerifyRecoveryCode = () => {
  const navigate = useNavigate()
  const { user, email } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user || !email) {
      navigate(Routes.Main, { replace: true })
    }
  }, [user, navigate])

  return (
    <Container sx={{ mt: 6 }}>
      <VerifyRecoveryCodeForm />
    </Container>
  )
}

export default VerifyRecoveryCode
