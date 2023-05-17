import { ChangeEventHandler, FC, KeyboardEventHandler } from 'react'
import { useFormik } from 'formik'
import {
  Typography,
  TextField,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'

import { authActions } from '~/redux/auth.slice'
import { useDispatch, useSelector } from '~/redux/store'
import { authApi } from '~/redux/auth.api'
import { validationSchema } from './validation-schema'
import { initialValues } from './initial-values'
import AppError from '~/types/interfaces/app-error'
import Routes from '~/types/enums/routes'

interface VerifyRecoveryCodeFormValues {
  recoveryCode: string
}

const VerifyRecoveryCodeForm: FC = () => {
  const dispatch = useDispatch()
  const { error, email } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [
    verifyRecoveryCode,
    { isLoading: isLoadingVerifyRecoveryCode },
  ] = authApi.endpoints.verifyRecoveryCode.useLazyQuery()

  const onSubmit = async (values: VerifyRecoveryCodeFormValues) => {
    try {
      await verifyRecoveryCode({
        recoveryCode: values.recoveryCode,
        email,
      }).unwrap()

      navigate(Routes.ResetPassword)
    }
    
    catch (err) {console.log(err)
      dispatch(authActions.setError((err as AppError).data.message))
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const _onRecoveryCodeChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    formik.handleChange(event)
    dispatch(authActions.setError(null))
  }

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const isLetter = /^[a-zA-Zа-яА-Я]{1}$/.test(event.key)
    
    if (isLetter && !event.ctrlKey) {
      event.preventDefault()
    }
  }

  return (
    <Box sx={{ width: '300px', margin: '0 auto'}}>
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        Підтвердження коду відновлення пароля
      </Typography>
      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            name='recoveryCode'
            label='Recovery code'
            error={formik.touched.recoveryCode && !!formik.errors.recoveryCode}
            helperText={formik.touched.recoveryCode && formik.errors.recoveryCode}
            onChange={_onRecoveryCodeChange}
            onKeyDown={onKeyDown}
            value={formik.values.recoveryCode}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />

          {error && <Typography sx={{ mb: 2, color: 'error.600' }}>{error}</Typography>}

          <LoadingButton
            color='primary'
            onClick={formik.submitForm}
            variant='contained'
            sx={{ marginBottom: 2, width: 1 }}
            disabled={isLoadingVerifyRecoveryCode || Boolean(error)}
            loading={isLoadingVerifyRecoveryCode}
          >
            Далі
          </LoadingButton>
        </Box>
      </form>
    </Box>
  )
}


export default VerifyRecoveryCodeForm
