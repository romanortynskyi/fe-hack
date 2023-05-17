import { useFormik } from 'formik'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from '~/redux/store'
import Routes from '~/types/enums/routes'
import Progress from '~/components/progress'
import { authActions } from '~/redux/auth.slice'
import AppError from '~/types/interfaces/app-error'
import { useSendResetPasswordEmailMutation } from '~/redux/auth.api'
import validationSchema from './validation-schema'
import initialValues from './initial-values'

interface ForgotPasswordValues {
  email: string
}

const ForgotPasswordForm = () => {
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [
    sendResetPasswordEmail,
    { isLoading: isSendResetPasswordEmailLoading },
  ] = useSendResetPasswordEmailMutation()

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      const { email } = values
      
      await sendResetPasswordEmail({
        email,
        language: 'en',
      })

      dispatch(authActions.setEmail(email))
      dispatch(authActions.setError(null))
      navigate(Routes.VerifyRecoveryCode)
    }

    catch (err) {
      dispatch(authActions.setError((err as AppError).data.message))
    }
  }

  const formik = useFormik<ForgotPasswordValues>({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(authActions.setError(null))
    formik.handleChange(event)
  }

  return (
    <Box sx={{ width: '300px', margin: '0 auto' }}>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        Відновлення пароля
      </Typography>
      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            name='email'
            label='Email'
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            onChange={onEmailChange}
            value={formik.values.email}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />

          {error && <Typography sx={{ mb: 2, color: 'error.600' }}>{error}</Typography>}

          <LoadingButton
            variant='contained'
            sx={{ marginBottom: 2, width: 1 }}
            onClick={formik.submitForm}
            loading={isSendResetPasswordEmailLoading}
          >
            Готово
          </LoadingButton>
        </Box>
      </form>
    </Box>
  )
}

export default ForgotPasswordForm
