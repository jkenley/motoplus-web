import { FormEvent, useCallback, useState } from 'react';

import { FormErrors, FormValues } from '../types';

const useForm = (submitCallback: (values: FormValues) => void, validate: (values: FormValues) => FormErrors) => {
  const [values, setValues] = useState<FormValues>({ store: '', qrCode: '', fullName: '', phoneNumber: '', note: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      setValues((values) => ({ ...values, [name]: value }));
    },
    [],
  );

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

export default useForm;
