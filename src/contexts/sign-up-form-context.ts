import { createContext } from 'react';

import SignUpFormState from '~/types/interfaces/sign-up-form-state';

interface SignUpFormContextValue {
  data: SignUpFormState;
  setData: React.Dispatch<React.SetStateAction<SignUpFormState>>;
}

const SignUpFormContext = createContext<SignUpFormContextValue>({
  data: {
    image: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    step: 0,
  },
  setData: () => {},
});

export default SignUpFormContext;
