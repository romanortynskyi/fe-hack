import { FC } from 'react'
import { useFormik } from 'formik'
import {
  Typography,
  TextField,
  Box,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from '~/redux/store'
import { useResetPasswordMutation } from '~/redux/auth.api'
import { authActions } from '~/redux/auth.slice'
import AppError from '~/types/interfaces/app-error'
import Routes from '~/types/enums/routes'
import validationSchema from './validation-schema'
import initialValues from './initial-values'

interface ResetPasswordFormValues {
  password: string
  confirmPassword: string
}

const ResetPasswordForm: FC = () => {
  const dispatch = useDispatch()
  const { error, email, recoveryCode } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [resetPassword, { isLoading: isLoadingResetPassword }] = useResetPasswordMutation()

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await resetPassword({
        email,
        recoveryCode,
        password: values.password,
      }).unwrap()

      navigate(Routes.Main, { replace: true })
    }

    catch (err) {
      dispatch(authActions.setError((err as AppError).data.message))
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <Box sx={{ width: '300px', margin: '0 auto' }}>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        Зміна пароля
      </Typography>
      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            type='password'
            name='password'
            label='Password'
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            value={formik.values.password}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />

          <TextField
            type='password'
            name='confirmPassword'
            label='Confirm password'
            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />

          {error && <Typography sx={{ mb: 2, color: 'error.600' }}>{error}</Typography>}

          <LoadingButton
            color='primary'
            onClick={formik.submitForm}
            variant='contained'
            sx={{ marginBottom: 2, width: 1 }}
            disabled={isLoadingResetPassword || Boolean(error)}
            loading={isLoadingResetPassword}
          >
            Зберегти
          </LoadingButton>
        </Box>
      </form>
    </Box>
  )
}

export default ResetPasswordForm
