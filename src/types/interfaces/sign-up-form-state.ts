import AppFile from '~/types/interfaces/app-file'

interface SignUpFormState {
  image: AppFile | null
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  step: number
}

export default SignUpFormState
