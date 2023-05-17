import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введіть валідний email')
    .required('Введіть email'),
})

export default validationSchema
