import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Введіть ім'я"),
  lastName: Yup.string().required('Введіть прізвище'),
  email: Yup.string().email('Введіть валідний email').required('Введіть email'),
});

export default validationSchema;
