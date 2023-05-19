import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

import Routes from '~/types/enums/routes';
import ForgotPasswordForm from '~/containers/forgot-password-form';
import { useSelector } from '~/redux/store';

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate(Routes.Main, { replace: true });
    }
  }, [user, navigate]);

  return (
    <Container sx={{ mt: 6 }}>
      <ForgotPasswordForm />
    </Container>
  );
};

export default ForgotPassword;
