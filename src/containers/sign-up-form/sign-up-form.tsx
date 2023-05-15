import { useState } from 'react'

import SignUpFormFirstStep from '~/containers/sign-up-form-first-step'
import SignUpFormSecondStep from '~/containers/sign-up-form-second-step'
import SignUpFormContext from '~/contexts/sign-up-form-context'
import SignUpFormState from '~/types/interfaces/sign-up-form-state'

const SignUpForm = () => {
  const [data, setData] = useState<SignUpFormState>({
    image: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    step: 0,
  })

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
