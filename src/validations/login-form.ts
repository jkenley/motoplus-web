import { LoginErrors, LoginValues } from '../types';

const validateLoginForm = (values: LoginValues): LoginErrors => {
  const errors: LoginErrors = {};

  // Email validation
  if (!values.email) {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email.replace(/\s+/g, ''))) {
    errors.email = 'El correo electrónico no es válido';
  }

  // Password validation
  if (!values.password) {
    errors.password = 'La contraseña es obligatoria';
  }

  return errors;
};

export default validateLoginForm;
