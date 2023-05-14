import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Routes from '~/types/enums/routes'

import SignUpFormFirstStep from '~/containers/sign-up-form-first-step'
import SignUpFormSecondStep from '~/containers/sign-up-form-second-step'
import SignUpFormContext from '~/contexts/sign-up-form-context'
import SignUpFormState from '~/types/interfaces/sign-up-form-state'

const SignUpForm = () => {
  const navigate = useNavigate()

  const [data, setData] = useState<SignUpFormState>({
    image: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    step: 0,
  })

  const onLogin = () => {
    navigate(Routes.Login, { replace: true })
  }

  const onSignInWithGoogle = () => {

  }

  const onSignInWithFacebook = () => {

  }

  const onGoBack = (newData: any) => {

  }

  const handleSubmit = (newData: any) => {
    
  }

  const steps = [
    <SignUpFormFirstStep />, 
    <SignUpFormSecondStep />,
  ]

  return (
    <SignUpFormContext.Provider value={{
      data,
      setData,
    }}>
      {steps[data.step]}
    </SignUpFormContext.Provider>
  )
}

export default SignUpForm
