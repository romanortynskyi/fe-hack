import { useContext } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  TextField,
  Button,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from 'react-redux'

import SignUpFormContext from '~/contexts/sign-up-form-context'
import LocalStorageKeys from '~/types/enums/local-storage-keys'
import SignUpFormState from '~/types/interfaces/sign-up-form-state'
import { useSignUpMutation } from '~/redux/auth.api'
import { authActions } from '~/redux/auth.slice'
import secondStepInitialValues from './initial-values'
import validationSchema from './validation-schema'

interface SignUpFormSecondStepValues {
  password: string
  confirmPassword: string
}

const SignUpFormSecondStep = () => {
  const dispatch = useDispatch()
  const { data: signUpFormData, setData } = useContext(SignUpFormContext)

  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation()

  const {
    password,
    confirmPassword,
  } = signUpFormData

  const necessaryValues = {
    password,
    confirmPassword,
  }

  const initialValues = necessaryValues !== secondStepInitialValues
    ? necessaryValues
    : secondStepInitialValues

  const handleSubmit = async (values: SignUpFormSecondStepValues) => {
    const {
      firstName,
      lastName,
      email,
      image,
    } = signUpFormData

    const formData = new FormData()

    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)

    if (image) {
      formData.append('image', image?.file || '', 'image')
    }

    formData.append('password', values.password)

    try {
      const signUpData = await signUp(formData).unwrap()

      localStorage.setItem(LocalStorageKeys.Token, signUpData.token)

      dispatch(authActions.setUser(signUpData))
    }

    catch (error) {
      console.error(error)
    }
  }

  const onGoBack = (values: SignUpFormSecondStepValues) => {
    setData((prevData: SignUpFormState) => ({
      ...prevData,
      step: prevData.step - 1,
      ...values,
    }))
  }

  const onLogin = () => {

  }

  const formik = useFormik<SignUpFormSecondStepValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ width: '300px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          type='password'
          name='password'
          label='Пароль'
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password?.toString()}
          onChange={formik.handleChange}
          value={formik.values.password}
          sx={{ marginBottom: 2, width: 1 }}
          onBlur={formik.handleBlur}
        />
        <TextField
          type='password'
          name='confirmPassword'
          error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword?.toString()}
          label='Введіть пароль ще раз'
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          sx={{ marginBottom: 2, width: 1 }}
          onBlur={formik.handleBlur}
        />

        <Button
          onClick={() => onGoBack(formik.values)}
          color='primary'
          variant='contained'
          sx={{ marginBottom: 2, width: 1 }}
        >
          Назад
        </Button>

        <LoadingButton
          onClick={() => {
            formik.submitForm()
            formik.setSubmitting(false)
          }}
          color='primary'
          variant='contained'
          sx={{ marginBottom: 2, width: 1 }}
          loading={isSignUpLoading}
        >
          Зареєструватись
        </LoadingButton>
        <Button
          onClick={onLogin}
          color='primary'
          variant='contained'
          sx={{ marginBottom: 2, width: 1 }}
        >
          Увійти
        </Button>
      </Box>
    </form>
  )
}

export default SignUpFormSecondStep
