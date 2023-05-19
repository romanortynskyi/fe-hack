import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Пароль має містити щонайменше 6 символів')
    .required('Введіть пароль'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Введені паролі відрізняються!')
    .required('Введіть пароль'),
});

export default validationSchema;
