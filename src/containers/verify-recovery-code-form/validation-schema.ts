import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  recoveryCode: Yup.string()
    .matches(/^\d{6}$/, 'Код підтвердження має містити 6 цифр')
    .required('Введіть код підтвердження'),
})
