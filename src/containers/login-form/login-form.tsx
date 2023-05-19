import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

import { useDispatch, useSelector } from '~/redux/store';
import Routes from '~/types/enums/routes';
import Progress from '~/components/progress';
import { authActions } from '~/redux/auth.slice';
import LocalStorageKeys from '~/types/enums/local-storage-keys';
import { useLoginMutation } from '~/redux/auth.api';
import AppError from '~/types/interfaces/app-error';
import validationSchema from './validation-schema';
import initialValues from './initial-values';

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const onSubmit = async (values: LoginValues) => {
    try {
      const user = await login(values).unwrap();

      if (user) {
        dispatch(authActions.setUser(user));
        localStorage.setItem(LocalStorageKeys.Token, user.token);
      }
    } catch (err) {
      dispatch(authActions.setError((err as AppError).data.message));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(authActions.setError(null));
    formik.handleChange(event);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(authActions.setError(null));
    formik.handleChange(event);
  };

  return (
    <Box sx={{ width: '300px', margin: '0 auto' }}>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Вхід
      </Typography>
      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            name="email"
            label="Email"
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            onChange={onEmailChange}
            value={formik.values.email}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />

          <TextField
            type="password"
            name="password"
            label="Пароль"
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            onChange={onPasswordChange}
            value={formik.values.password}
            sx={{ marginBottom: 2, width: 1 }}
            onBlur={formik.handleBlur}
          />

          {error && (
            <Typography sx={{ mb: 2, color: 'error.600' }}>{error}</Typography>
          )}

          <Button
            color="primary"
            onClick={formik.submitForm}
            variant="contained"
            sx={{ marginBottom: 2, width: 1 }}
            disabled={isLoginLoading || Boolean(error)}
          >
            Увійти
            {isLoginLoading && <Progress />}
          </Button>

          <Button
            component={Link}
            variant="contained"
            sx={{ marginBottom: 2, width: 1 }}
            to={Routes.SignUp}
          >
            Зареєструватись
          </Button>

          <Box sx={{ alignSelf: 'flex-end' }}>
            <Link to={Routes.ForgotPassword}>Забули пароль?</Link>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
