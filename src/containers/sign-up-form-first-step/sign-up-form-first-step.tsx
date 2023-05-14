import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

import ImageInput from '~/components/image-input'
import SignUpFormContext from '~/contexts/sign-up-form-context'
import SignUpFormState from '~/types/interfaces/sign-up-form-state'
import { validationSchema } from './validation-schema'
import AppFile from '~/types/interfaces/app-file'
import { userApi } from '~/redux/user.api'
import { initialValues as signUpFirstStepInitialValues } from './initial-values'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import AppError from '~/types/interfaces/app-error'

interface SignUpFormFirstStepValues {
  firstName: string
  lastName: string
  email: string
  image: AppFile | null
}

const SignUpFormFirstStep = () => {
  const [imageIsLoading, setImageIsLoading] = useState(false)
  const { data: signUpFormData, setData } = useContext(SignUpFormContext)

  const [checkIfUserExistsByEmail, { isLoading: isUserExistsByEmailLoading }] = userApi.endpoints.checkIfUserExistsByEmail.useLazyQuery()

  const {
    firstName,
    lastName,
    email,
    image,
  } = signUpFormData

  const necessaryValues = {
    firstName,
    lastName,
    email,
    image,
  }

  const initialValues = necessaryValues !== signUpFirstStepInitialValues ? necessaryValues : signUpFirstStepInitialValues 
  
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageIsLoading(true)
      const reader = new FileReader()
          
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setData((prevData: SignUpFormState) => ({
          ...prevData,
          image: {
            base64: e.target?.result as string,
            file,
          },
        }))
        setImageIsLoading(false)
      }

      reader.readAsDataURL(file)
    }
  }
      
  const onImageDelete = () => {
    setData((prevData: SignUpFormState) => ({
      ...prevData,
      image: null,
    }))
  }

  const handleSubmit = async (values: SignUpFormFirstStepValues) => {
    const { error } = await checkIfUserExistsByEmail(values.email)

    if ((error as FetchBaseQueryError)?.status === 409) {
      formik.setFieldError('email', (error as AppError)?.data.message)
    }

    else {
      setData((prevData: SignUpFormState) => ({
        ...prevData,
        ...values,
        image,
        step: prevData.step + 1,
      }))
    }
  }

  const formik = useFormik<SignUpFormFirstStepValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  })
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
        <ImageInput 
          imgSrc={image?.base64 || ''}
          onChange={onImageChange}
          onDelete={onImageDelete}
          isLoading={imageIsLoading}
        />
        <TextField
          name='firstName'
          label={`Ім'я`}
          error={formik.touched.firstName && !!formik.errors.firstName}
          helperText={formik.touched.firstName && formik.errors.firstName?.toString()}
          onChange={formik.handleChange}
          value={formik.values.firstName}
          sx={{ marginBottom: 2, width: 1 }}
          onBlur={formik.handleBlur}
        />
        <TextField
          name='lastName'
          label='Прізвище'
          error={formik.touched.lastName && !!formik.errors.lastName}
          helperText={formik.touched.lastName && formik.errors.lastName?.toString()}
          onChange={formik.handleChange}
          value={formik.values.lastName}
          sx={{ marginBottom: 2, width: 1 }}
          onBlur={formik.handleBlur}
        />
        <TextField
          name='email'
          label='Email'
          error={formik.touched && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email?.toString()}
          onChange={formik.handleChange}
          value={formik.values.email}
          sx={{ marginBottom: 2, width: 1 }}
          onBlur={formik.handleBlur}
        /> 
        <LoadingButton
          onClick={formik.submitForm}
          color='primary'
          variant='contained'
          sx={{ marginBottom: 2, width: 1 }}
          loading={isUserExistsByEmailLoading}
        >
          Далі
        </LoadingButton>
        <Button
          // onClick={onLogin}
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

export default SignUpFormFirstStep
