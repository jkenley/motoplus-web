import { FormErrors, FormValues } from '../types';

const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  // Store name validation
  if (!values.store) {
    errors.store = 'El nombre de la tienda es obligatorio';
  }

  // Full name validation
  if (!values.fullName) {
    errors.fullName = 'El nombre completo es obligatorio';
  }

  // Phone number validation
  if (!values.phoneNumber) {
    errors.phoneNumber = 'El número de teléfono es obligatorio';
  } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Formato de número de teléfono inválido';
  }

  return errors;
};

export default validateForm;
