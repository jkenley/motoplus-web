import { FormEvent, useCallback, useState } from 'react';

import { LoginErrors, LoginValues } from '../types';

const useLoginForm = (
  submitCallback: (values: LoginValues) => void,
  validate: (values: LoginValues) => LoginErrors,
) => {
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((values) => ({ ...values, [name]: value }));
  }, []);

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newErrors = validate(values);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        submitCallback(values);
      } catch (error) {
        // Handle submission error
        console.error('Form submission error:', error);
      }
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useLoginForm;
