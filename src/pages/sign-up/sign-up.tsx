import { FC, useEffect } from 'react'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

import SignUpForm from '~/containers/sign-up-form'
import { useSelector } from '~/redux/store'
import Routes from '~/types/enums/routes'

const SignUp: FC = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      navigate(Routes.Main)
    }
  }, [user, navigate])

  return (
    <Box>
      <SignUpForm />
    </Box>
  )
}

export default SignUp
